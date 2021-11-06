<template>
  <main class="home">
    <section id="calendar-wrapper" class="block-container">
      <NSpin :show="!loaded" class="w-full h-full rounded-md">
        <iframe
          v-if="config"
          class="w-full h-full rounded-md min-h-[500px]"
          :src="config.gCalendar"
          frameborder="0"
          @load="loaded = true"
        ></iframe>
      </NSpin>
    </section>
    <section id="form-wrapper" class="block-container">
      <NSpin :show="sending">
        <RentForm @submit="sendEmail" />
      </NSpin>
    </section>
  </main>
</template>

<script setup lang="ts">
import { useMessage, NSpin } from 'naive-ui'
import { send } from 'emailjs-com'
import { computed, onMounted, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import * as ls from 'local-storage'

const store = useStore()
const config = computed(() => store.state.config)
const loaded = ref(false)
const message = useMessage()
const sending = ref(false)

const sendEmail = async (formData: any) => {
  sending.value = true
  try {
    await send(
      config.value.serviceID,
      config.value.templateID,
      formData,
      config.value.mailjsUserID
    )
    message.success('已成功寄出申請 !')
    sending.value = false
    ls.set('cd', dayjs(new Date()).add(10, 'm').unix())
    setTimeout(() => {
      location.reload()
    }, 1000)
  } catch (error) {
    message.error(`${error}\n 請聯繫管理員`)
    console.log(error)
    sending.value = false
  }
}

onMounted(async () => {})
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
