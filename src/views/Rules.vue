<template>
  <div class="rules markdown-body">
    <div v-html="rulesContent"></div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core'
import sanitizeHtml from 'sanitize-html'
import { useStore } from 'vuex'

const store = useStore()
const config = computed(() => store.state.config)

const rulesContent = ref<string>('')

const cleanHtml = (source: string) => {
  const res = sanitizeHtml(source, {
    allowedAttributes: false,
  })
  rulesContent.value = res
}

onMounted(() => {
  const rules = config.value.rules
  // rulesContent.value = rules
  cleanHtml(rules)
})
</script>

<style lang="postcss" scoped>
.rules {
  @apply text-light-800 text-left max-w-[800px];
}
</style>
