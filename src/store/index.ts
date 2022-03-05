import { createStore } from 'vuex'
import configStore from './modules/config'
import authStore from './modules/auth'
import { saveDepartment } from '@/utils/localstorage'

export default createStore({
  state: {
    department: null,
    db: null,
  },
  mutations: {
    SET_DB: (state, db): void => {
      state.db = db
    },
    SET_DEPARTMENT: (state, department): void => {
      state.department = department
      saveDepartment(department)
    },
  },
  actions: {},
  modules: {
    configStore,
    authStore,
  },
})
