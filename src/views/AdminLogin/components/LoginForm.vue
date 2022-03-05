<template>
  <NForm :model="formData" :rules="formRules" ref="formRef">
    <NFormItem label="電子信箱" path="email">
      <NInput placeholder="請輸入" v-model:value="formData.email" @keyup.enter.prevent="signin"/>
    </NFormItem>
    <NFormItem label="密碼" path="password">
      <NInput
        type="password"
        show-password-on="click"
        placeholder="請輸入"
        v-model:value="formData.password"
        @keyup.enter.prevent="signin"
      />
    </NFormItem>

    <NButton class="signin-btn" :loading="loading" block type="primary" @click.prevent="signin"
      >登入</NButton
    >
  </NForm>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { reactive, ref } from '@vue/runtime-core'
import { NForm, NFormItem, NInput, NButton, FormRules } from 'naive-ui'
import { emailCheck } from '@/validation/validator'
import { authStatus } from '@/config/auth'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

// --- Use ---
const store = useStore()
const router = useRouter()
const message = useMessage()

// --- Data ---
const loading = ref<boolean>(false)
const formRef = ref<any>(null)
const formData = reactive({
  email: '',
  password: '',
})
const formRules: FormRules = {
  email: {
    required: true,
    trigger: 'blur',
    message: '請輸入正確電子信箱',
    validator: emailCheck,
  },
  password: {
    required: true,
    message: '請輸入正確密碼',
    trigger: 'blur',
  },
}

// --- Methods ---
const authAccount = async () => {
  const errCode = await store.dispatch('adminLogin', {
    email: formData.email,
    password: formData.password,
  })
  if(errCode) return message.error(authStatus[errCode])
  if(!errCode) {
    message.success('登入成功 !')
    router.push({name: 'Dashboard'})
  }
}

const signin = async () => {
  loading.value = true
  formRef.value.validate(async (errors: any) => {
    if (errors) {
      loading.value = false
      return
    }
    await authAccount()
  })
  loading.value = false
}
</script>

<style lang="postcss" scoped>
.signin-btn {
  @apply mt-[30px];
}
</style>
