<template>
  <NForm :model="formData" :rules="formRules" ref="formRef">
    <NFormItem label="電子信箱" path="class">
      <NInput placeholder="請輸入" />
    </NFormItem>
    <NFormItem label="密碼" path="teacher">
      <NInput placeholder="請輸入" />
    </NFormItem>
  </NForm>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/runtime-core'
import { NForm, NFormItem, NInput } from 'naive-ui'

const formRef = ref(null)
const formData = reactive({
  email: '',
  password: '',
})
const formRules = {
  email: {
    required: true,
    trigger: 'blur',
  },
  password: {
    required: true,
    trigger: 'blur',
  },
}
</script>

<style lang="postcss" scoped></style>
