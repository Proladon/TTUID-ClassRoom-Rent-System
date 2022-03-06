<template>
  <div class="date-period">
    <NDatePicker
      class="w-full"
      :is-date-disabled="dateDisabled"
      placeholder="選擇借用日期"
      :on-update:value="selectDate"
    />

    <div
      class="period-group"
      :class="{ error: periodErr && !selectedPeriods.length }"
    >
      <NButton class="w-full" :type="periodType(1)" @click="pushPeriod(1)"
        >08:10 ~ 11:30</NButton
      >
      <NButton class="w-full" :type="periodType(2)" @click="pushPeriod(2)"
        >13:00 ~ 16:30</NButton
      >
      <NButton class="w-full" :type="periodType(3)" @click="pushPeriod(3)"
        >17:00 ~ 22:00</NButton
      >
      <NButton class="w-full" :type="periodType(0)" @click="pushPeriod(0)"
        >全天</NButton
      >
    </div>
  </div>
</template>

<script setup lang="ts">
import { findIndex } from 'lodash-es'
import { NButton, NDatePicker } from 'naive-ui'
import { onMounted, ref } from '@vue/runtime-core'
import dayjs from 'dayjs'

const emit = defineEmits(['date', 'period'])
defineProps({
  periodErr: Boolean,
})
const selectedPeriods = ref<number[]>([])

const pushPeriod = (key: number) => {
  if (key === 0) {
    selectedPeriods.value = [0]
    emit('period', selectedPeriods.value)
    return
  }
  const exist = findIndex(selectedPeriods.value, (period) => period === key)
  if (exist >= 0) selectedPeriods.value.splice(exist, 1)
  if (exist < 0) selectedPeriods.value.push(key)

  const allDay = findIndex(selectedPeriods.value, (period) => period === 0)
  if (allDay >= 0) selectedPeriods.value.splice(allDay, 1)
  emit('period', selectedPeriods.value)
}

const selectDate = (date: number) => {
  emit('date', date)
}

const periodType = (index: number): any => {
  return selectedPeriods.value.includes(index) ? 'primary' : ''
}

const dateDisabled = (ts: number): boolean => {
  const date = dayjs(new Date(ts))
  const today = dayjs(new Date())
  const end = today.add(21, 'd')

  return !(date.isAfter(today) && date.isBefore(end))
}

onMounted(() => {
  pushPeriod(0)
})
</script>

<style lang="postcss" scoped>
.date-period {
  @apply grid w-full;
}
.period-group {
  @apply grid grid-cols-2 gap-2 mt-[10px];
}

.error {
  @apply border-1 border-[#e88080] border-solid;
}
</style>
