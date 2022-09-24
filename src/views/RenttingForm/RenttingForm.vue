<template>
  <main class="home">
    <section id="calendar-wrapper" class="block-container">
      <NSpin :show="!loaded" class="w-full h-full rounded-md">
        <iframe
          v-if="departmentConfig"
          class="w-full h-full rounded-md min-h-[500px]"
          :src="departmentConfig.gCalendar"
          frameborder="0"
          @load="loaded = true"
        ></iframe>
      </NSpin>
    </section>
    <section id="form-wrapper" class="block-container">
      <NSpin :show="sending">
        <Form @submit="sendEmail" />
      </NSpin>
    </section>

    <PeriodWarningModal v-if="showPeriodWarningModal" />
  </main>
</template>

<script setup lang="ts">
import PeriodWarningModal from '@/components/PeriodWarningModal.vue'
import Form from './components/Form.vue'
import { useMessage, NSpin } from 'naive-ui'
import { send } from 'emailjs-com'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import * as ls from 'local-storage'
import useConfig from '@/use/useConfig'
import { get } from 'lodash-es'

const store = useStore()
const message = useMessage()
const { departmentConfig, currentEmailjs } = useConfig()

const showPeriodWarningModal = ref(false)
const loaded = ref(false)
const sending = ref(false)

const sendEmail = async (formData: any) => {
  sending.value = true
  try {
    await send(
      currentEmailjs.value.serviceID,
      currentEmailjs.value.templateID,
      formData,
      currentEmailjs.value.mailjsUserID
    )
    message.success('已成功寄出申請 !')
    sending.value = false
    ls.set('cd', dayjs().add(10, 'm').unix())
    setTimeout(() => {
      location.reload()
    }, 1000)
  } catch (error: any) {
    message.error(`${error.text}\n 請聯繫管理員`)
    console.log(error.text)
    sending.value = false
  }
}

const checkInAllowPeriod = () => {
  const config = departmentConfig.value
  const start = get(config.formAllowPeriods, 'start')
  const end = get(config.formAllowPeriods, 'end')

  if (start && end) {
    const startTime = dayjs(start)
    const endTime = dayjs(end)
    const now = dayjs()

    if (now.isBefore(startTime)) showPeriodWarningModal.value = true
    if (now.isAfter(endTime)) showPeriodWarningModal.value = true
  }
  console.log('here')
  return true
}

onMounted(() => {
  checkInAllowPeriod()
})
</script>

<style scoped lang="postcss">
::v-deep .n-spin-content {
  @apply h-full;
}
.home {
  @apply grid grid-cols-2 gap-5;
  @apply <tablet: grid-cols-1;
}
.block-container {
  @apply bg-[#c5baaf] p-5 rounded-xl bg-opacity-30 shadow-xl;
  transition: 1s;
}
</style>
