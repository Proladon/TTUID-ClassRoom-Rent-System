<template>
  <NForm :model="formData" :rules="formRules" ref="formRef">
    <div class="group-container">
      <NFormItem label="課程名稱" path="class">
        <NInput placeholder="請輸入" />
      </NFormItem>
      <NFormItem label="授課教師" path="teacher">
        <NInput placeholder="請輸入" />
      </NFormItem>
      <NFormItem label="用途" path="purpose">
        <NInput placeholder="請輸入" />
      </NFormItem>
      <NFormItem label="借用器材" path="tools">
        <NInput placeholder="請輸入" />
      </NFormItem>
    </div>
  </NForm>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/runtime-core'
import { NForm, NFormItem, NInput } from 'naive-ui'

const formRef = ref(null)
const formData = reactive({
  class: '',
  teacher: '',
  purpose: '',
  tools: '',
})
const formRules = {
  class: {
    required: true,
    trigger: 'blur',
  },
  teacher: {
    required: true,
    trigger: 'blur',
  },
  purpose: {
    required: true,
    trigger: 'blur',
  },
  tools: {
    required: true,
    trigger: 'blur',
  },
}
</script>

<style lang="postcss" scoped>
.group-container {
  @apply grid grid-cols-2 gap-5;
}
</style>
