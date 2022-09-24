<template>
  <div class="common-setting">
    <NForm ref="formRef" :model="formData" :rules="formRules">
      <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
        <NInput
          v-model:value="formData.gCalendar"
          placeholder="https://calendar.google.com/calendar/embed ..."
        />
      </NFormItem>

      <NFormItem label="紙本表單連結" path="outerLinks">
        <NInput
          v-model:value="formData.outerLinks[0].link"
          placeholder="請輸入連結網址"
        />
      </NFormItem>

      <div>
        <p class="text-left mb-[6px]">表單開放時段設定</p>
        <div class="flex items-center gap-[12px]">
          <NFormItem label="開始時段" label-placement="left">
            <n-time-picker
              v-model:value="formData.formAllowPeriods.start"
              placeholder="選擇時段"
              format="h:mm a"
            />
          </NFormItem>

          <NFormItem label="結束時段" label-placement="left">
            <n-time-picker
              v-model:value="formData.formAllowPeriods.end"
              placeholder="選擇時段"
              format="h:mm a"
            />
          </NFormItem>
        </div>
      </div>
    </NForm>

    <div class="flex justify-end">
      <n-button type="primary" @click="updateCommon">儲存設定</n-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { NInput, NForm, NFormItem, NButton, NTimePicker } from 'naive-ui'
import useConfig from '@/use/useConfig'
import { useStore } from 'vuex'
import { get } from 'lodash-es'

const store = useStore()
const { gCalendar, outerLinks, updateDepartmentConfig } = useConfig()

const formRef = ref<any>(null)
const formData = reactive({
  gCalendar: '',
  outerLinks: [
    {
      name: '📄 紙本表單',
      link: '',
    },
  ],
  formAllowPeriods: {
    start: null,
    end: null,
  },
})

const formRules = {
  gCalendar: {
    required: true,
    trigger: 'blur',
    message: '請輸入 Google 月曆嵌入網址',
    validator: (rule: any, value: string | null | undefined) => {
      if (!value) return false
      if (!value.trim()) return false
      return true
    },
  },
}

const departmentConfig = computed(() => store.state.configStore.config)

const updateCommon = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    await updateDepartmentConfig('any', formData)
  })
}

const syncData = () => {
  const config = departmentConfig.value
  formData.gCalendar = gCalendar.value
  if (outerLinks.value) {
    formData.outerLinks[0].link = outerLinks.value[0]
      ? outerLinks.value[0].link
      : ''
  }

  const periodStart = get(config.formAllowPeriods, 'start')
  const periodEnd = get(config.formAllowPeriods, 'end')
  if (periodStart && periodEnd)
    formData.formAllowPeriods = config.formAllowPeriods
  if (!periodStart && !periodEnd)
    formData.formAllowPeriods = { start: null, end: null }
}

onMounted(() => {
  syncData()
})
</script>

<style lang="postcss" scoped></style>
