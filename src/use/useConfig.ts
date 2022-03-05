import { useMessage } from "naive-ui"
import { computed } from '@vue/runtime-core'
import { useStore } from "vuex"
import { doc, updateDoc } from 'firebase/firestore'

export default () => {
  const store = useStore()
  const message = useMessage()

  const db = computed(() => store.state.db)
  const department = computed(() => store.state.department)
  const departmentConfig = computed(() => store.state.configStore.config)
  const emailJsSet = computed(() => departmentConfig.value.mailJsSet)
  const currentEmailjs = computed(() => departmentConfig.value.currentEmailjs)
  const gCalendar = computed(() => departmentConfig.value.gCalendar)
  const outerLinks = computed(() => departmentConfig.value.outerLinks)

  const refreshConfig = async () => {
    await store.dispatch('getDepartmentConfig', department.value)
  }

  const updateDepartmentConfig = async (key: string, newData: any) => {
    const deparmentConfigRef = doc(db.value, 'Department', department.value)

    try {
      if(key === 'any') await updateDoc(deparmentConfigRef, newData)
      else {
        await updateDoc(deparmentConfigRef, {
          [key]: newData,
        })
      }
      message.success('更新成功 !')
      await refreshConfig()
    } catch (error: any) {
      console.log(error)
      message.error(error.code)
    }
  }

  return {
    db,
    department,
    departmentConfig,
    emailJsSet,
    refreshConfig,
    currentEmailjs,
    gCalendar,
    outerLinks,
    updateDepartmentConfig
  }
}