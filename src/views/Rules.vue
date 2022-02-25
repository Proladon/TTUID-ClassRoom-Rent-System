<template>
  <div class="rules markdown-body">
    <div v-if="departmentConfig" v-html="cleanHtml()"></div>
  </div>
</template>

<script setup lang="ts">
import { computed } from '@vue/runtime-core'
import sanitizeHtml from 'sanitize-html'
import { useStore } from 'vuex'

const store = useStore()
const departmentConfig = computed(() => store.state.configStore.config)
const rawRules = computed(() => departmentConfig.value.rules)

const cleanHtml = () => {
  return sanitizeHtml(rawRules.value, {
    allowedAttributes: false,
  })
}
</script>

<style lang="postcss" scoped>
.rules {
  @apply text-light-800 text-left max-w-[800px];
}
</style>
