<template>
  <NForm :model="formData" :rules="formRules" ref="formRef">
    <NFormItem label="電子信箱" path="email">
      <NInput placeholder="請輸入" v-model:value="formData.email" />
    </NFormItem>
    <NFormItem label="密碼" path="password">
      <NInput
        type="password"
        show-password-on="click"
        placeholder="請輸入"
        v-model:value="formData.password"
      />
    </NFormItem>

    <NButton class="signin-btn" block type="primary" @click="signin"
      >登入</NButton
    >
  </NForm>
</template>

<script setup lang="ts">
import { useMessage } from 'naive-ui'
import { reactive, ref } from '@vue/runtime-core'
import { NForm, NFormItem, NInput, NButton, FormRules } from 'naive-ui'
import { emailCheck } from '@/validation/validator'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { authStatus } from '@/config/auth'
import dayjs from 'dayjs'
import * as ls from 'local-storage'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()
const fireAuth = getAuth()
const message = useMessage()
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

const authAccount = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    try {
      const res: any = await signInWithEmailAndPassword(
        fireAuth,
        formData.email,
        formData.password
      )
      message.success('登入成功')
      saveUser(res.user)
      store.commit('SET_SIGNIN', true)
      router.push({ name: 'Dashboard' })
    } catch (error: any) {
      const code: string = error.code
      message.error(authStatus[code])
    }
  })
}

const saveUser = (user: User) => {
  ls.set('user', {
    name: user,
    uid: user.uid,
    exp: dayjs(new Date()).add(1, 'd').unix(),
  })
}

const signin = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    await authAccount()
  })
}
</script>

<style lang="postcss" scoped>
.signin-btn {
  @apply mt-[30px];
}
</style>
