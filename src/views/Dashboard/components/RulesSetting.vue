<template>
  <div class="rules-setting">
    <RulesEditor v-model:content="content" />
    <div class="flex justify-end mt-[30px]">
      <n-button type="primary" class="px-[50px]" @click="updateRules"
        >儲存</n-button
      >
    </div>
  </div>
</template>

<script setup>
import RulesEditor from './RulesEditor.vue'
import { NButton } from 'naive-ui'
import useConfig from '@/use/useConfig'
import { ref } from '@vue/reactivity'

const { updateDepartmentConfig } = useConfig()

const content = ref(null)

const updateRules = async () => {
  await updateDepartmentConfig('rules', content.value)
}
</script>

<style lang="postcss" scoped>
</style>