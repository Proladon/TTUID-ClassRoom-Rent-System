<template>
  <main class="home">
    <p class="title">選擇系所</p>
    <div class="departments-list">
      <n-alert 
        class="department-block"
        :class="{activated: department.code === curDeparment}"
        v-for="department in departments" 
        :key="department.code" 
        @click="selectDepartment(department.code)"
      >
        {{ department.name }}
      </n-alert>
    </div>
  </main>
</template>

<script setup lang="ts">
import { NAlert } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import departments from '@/config/departments'
import useConfig from '@/use/useConfig'
import { computed } from '@vue/runtime-core'

const { department: curDep  } = useConfig()

const store = useStore()
const router = useRouter()
const curDeparment = computed(() => curDep.value || '')


const selectDepartment = async(department: string) => {
  store.commit('SET_DEPARTMENT', department)
  await store.dispatch('adminLogOut')
  // => 取得當前部門設定檔
  await store.dispatch('getDepartmentConfig', department)
  router.push({ name: 'RenttingForm' })
}
</script>

<style scoped lang="postcss">
.title {
  @apply text-gray-300 text-xl mb-[30px];
}

.departments-list {
  @apply grid gap-[30px] max-w-[500px] px-[25px] m-auto;
}

.department-block {
  @apply cursor-pointer;
}

.activated {
  @apply bg-emerald-300 text-gray-800;
}

:deep(.activated .n-alert-body__content) {
  @apply !text-gray-800;
}
</style>
