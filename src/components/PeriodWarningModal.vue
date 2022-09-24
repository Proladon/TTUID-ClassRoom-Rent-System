<template>
  <n-modal v-model:show="show" :mask-closable="false">
    <div>
      <div class="modal-body m-[20px]">
        <p>很抱歉，當前非允許填寫時段</p>
        <p>{{ period }}</p>

        <n-button class="mt-[20px]" @click="$router.push({ name: 'Rules' })"
          >返回</n-button
        >
      </div>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NButton } from 'naive-ui'
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
import dayjs from 'dayjs'
import { get } from 'lodash-es'

const store = useStore()

const departmentConfig = computed(() => store.state.configStore.config)

const period = computed(() => {
  const config = departmentConfig.value
  const start = get(config.formAllowPeriods, 'start')
  const end = get(config.formAllowPeriods, 'end')

  const startTime = dayjs(start).format('HH:mm')
  const endTime = dayjs(end).format('HH:mm')

  return `${startTime} ~ ${endTime}`
})

const show = ref(true)
</script>

<style scoped lang="postcss">
.modal-body {
  @apply bg-[#2c3e50] p-[20px] rounded-md shadow-xl;
  @apply text-center leading-[30px] font-bold text-[18px];
}
</style>
