import { createStore } from 'vuex'

export default createStore({
  state: {
    config: null,
    db: null,
    signin: false,
    user: null,
  },
  mutations: {
    SET_CONFIG: (state, config) => {
      state.config = config
    },
    SET_DB: (state, db) => {
      state.db = db
    },
    SET_SIGNIN: (state, status) => {
      state.signin = status
    },
    SET_USER: (state, user) => {
      state.user = user
    },
  },
  actions: {},
  modules: {},
})
