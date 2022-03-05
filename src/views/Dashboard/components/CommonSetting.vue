<template>
  <div class="common-setting">
    <NForm ref="formRef" :model="formData" :rules="formRules">
      <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
        <NInput v-model:value="formData.gCalendar" 
          placeholder="https://calendar.google.com/calendar/embed ..."
        />
      </NFormItem>

      <NFormItem label="紙本表單連結" path="pdfFormLink">
        <NInput v-model:value="formData.pdfFormLink" placeholder="請輸入連結網址"/>
      </NFormItem>
    </NForm>
    <div class="flex justify-end">
      <n-button type="primary" @click="updateCommon">儲存設定</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { NInput, NForm, NFormItem, NButton } from 'naive-ui'
import useConfig from '@/use/useConfig'
import { useStore } from 'vuex'

const store = useStore()
const { gCalendar, updateDepartmentConfig } = useConfig()

const formRef = ref(null)
const formData = reactive({
  gCalendar: '',
  outerLinks: [],
})

const formRules = {
  gCalendar: {
    required: true,
    trigger: 'blur',
    message: '請輸入 Google 月曆嵌入網址',
    validator: (rule, value) => {
      if (!value) return false
      if(!value.trim()) return false
      return true
    },
  },
}

const departmentConfig = computed(() => store.state.configStore.config)

const updateCommon = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    await updateDepartmentConfig('gCalendar', formData.gCalendar)
  })
}

const syncData = () => {
  formData.gCalendar = gCalendar.value
}

onMounted(() => {
  syncData()
})
</script>

<style lang="postcss" scoped>
</style>