<template>
  <div class="rules-setting">
    <RulesEditor @update="$emit('update')" />
  </div>
</template>

<script setup>
import RulesEditor from './RulesEditor.vue'

defineEmits(['update'])
</script>

<style lang="postcss" scoped>
</style>