<template>
  <main class="home">
    <section id="calendar-wrapper" class="block-container">
      <iframe
        class="w-full h-full rounded-md min-h-[500px]"
        :src="config.gCalendar"
        frameborder="0"
      ></iframe>
    </section>
    <section id="form-wrapper" class="block-container">
      <RentForm @submit="sendEmail" />
    </section>
  </main>
</template>

<script setup lang="ts">
import { NButton, useMessage } from 'naive-ui'
import emailjs from 'emailjs-com'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'

const store = useStore()
const config = computed(() => store.state.config)
const message = useMessage()
const sendEmail = async (formData: object) => {
  console.log(formData)

  try {
    const res = await emailjs.send(
      config.value.serviceID,
      config.value.templateID,
      formData,
      config.value.mailjsUserID
    )
    console.log(res)
    message.success('已寄出申請')
  } catch (error) {
    console.log(error)
  }
}

onMounted(async () => {})
</script>

<style scoped lang="postcss">
.home {
  @apply grid grid-cols-2 gap-5 max-w-[1400px] m-auto;
  @apply <tablet: grid-cols-1;
}
.block-container {
  @apply bg-[#c5baaf] p-5 rounded-xl bg-opacity-30 shadow-xl;
  transition: 1s;
}
</style>
