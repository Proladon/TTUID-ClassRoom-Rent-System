<template>
  <div class="dashboard-side-menu">
    <n-tabs v-model:value="curTab" type="line" :on-update:value="tabChange">
      <n-tab name="common">
        一般設置
      </n-tab>
      <n-tab name="email">
        Email 服務設置
      </n-tab>
      <n-tab name="rules">
        規定及注意事項設置
      </n-tab>
    </n-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from '@vue/runtime-core'
import { NTabs, NTab } from 'naive-ui'

const emit = defineEmits(['update'])

const curTab = ref('common')
const tabChange = (tab: string) => {
  curTab.value = tab
  emit('update', tab)
}
</script>

<style lang="postcss" scoped>
.dashboard-side-menu {
  @apply w-full mb-[50px];
}
</style>