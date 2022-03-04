<template>
  <main class="home">
    <n-alert 
      v-for="department in deparments" 
      :key="department.code" 
      @click="selectDepartment(department.code)"
    >
      {{ department.name }}
    </n-alert>
  </main>
</template>

<script setup lang="ts">
import { NAlert } from 'naive-ui'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

const store = useStore()
const router = useRouter()

const deparments = [
  {
    name: '工業設計系',
    code: 'IndustrialDesign',
  },
  {
    name: '機械系',
    code: 'MechanicalEngineering'
  },
  {
    name: 'DEV',
    code: 'Dev'
  },
]

const selectDepartment = async(department: string) => {
  store.commit('SET_DEPARTMENT', department)
  // => 取得當前部門設定檔
  await store.dispatch('getDepartmentConfig', department)
  router.push({ name: 'RenttingForm' })
}
</script>

<style scoped lang="postcss">

</style>
