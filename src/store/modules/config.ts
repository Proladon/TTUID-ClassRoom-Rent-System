import { Module } from 'vuex'
import { getDoc, doc } from 'firebase/firestore'

const configStore: Module<any, any> = {
  state: {
    config: null,
  },
  mutations: {
    SET_CONFIG: (state, config): void => {
      state.config = config
    },
  },
  actions: {
    // => 取得當前部門設定檔
    getDepartmentConfig: async ({ commit, rootState }, department) => {
      const configRef = await getDoc(doc(rootState.db, 'Department', department))
      const config = configRef.data()
      commit('SET_CONFIG', config)
    }
  },
  getters: {

  }
}

export default configStore
