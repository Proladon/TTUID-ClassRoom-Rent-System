<template>
  <div class="common-setting">
    <NForm ref="formRef" :model="formData" :rules="formRules">
        <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
          <NInput v-model:value="formData.gCalendar" />
        </NFormItem>

        <NFormItem label="紙本表單連結" path="pdfFormLink">
          <NInput v-model:value="formData.pdfFormLink" />
        </NFormItem>
      </NForm>
  </div>
</template>

<script setup lang="ts">
import { reactive } from '@vue/runtime-core'
import { NInput, NForm, NFormItem } from 'naive-ui'

const formData = reactive({
  gCalendar: '',
  mailjsUserID: '',
  serviceID: '',
  templateID: '',
  pdfFormLink: '',
  rules: '',
  mailService: ''
})

const formRules = {}
</script>

<style lang="postcss" scoped>
</style>