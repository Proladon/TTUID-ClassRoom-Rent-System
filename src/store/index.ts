import { createStore } from 'vuex'

export default createStore({
  state: {
    config: null,
    db: null,
  },
  mutations: {
    SET_CONFIG: (state, config) => {
      state.config = config
    },
    SET_DB: (state, db) => {
      state.db = db
    },
  },
  actions: {},
  modules: {},
})
