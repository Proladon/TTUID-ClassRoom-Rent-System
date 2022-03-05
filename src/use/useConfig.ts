import { computed } from "vue"
import { useStore } from "vuex"

export default () => {
  const store = useStore()
  const db = computed(() => store.state.db)
  const department = computed(() => store.state.department)
  const departmentConfig = computed(() => store.state.configStore.config)
  const emailJsSet = computed(() => departmentConfig.value.mailJsSet)
  const currentEmailjs = computed(() => departmentConfig.value.currentEmailjs)

  const refreshConfig = async () => {
    await store.dispatch('getDepartmentConfig', department.value)
  }

  return { 
    db, 
    department, 
    departmentConfig, 
    emailJsSet, 
    refreshConfig,
    currentEmailjs,
  }
}