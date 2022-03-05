import { Module } from 'vuex'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  signOut 
} from 'firebase/auth'
import * as ls from 'local-storage'

const authStore: Module<any, any> = {
  state: {
    signin: false,
    user: null,
  },
  mutations: {
    SET_SIGNIN: (state, status): void => {
      state.signin = status
    },
    SET_USER: (state, user): void => {
      state.user = user
    },
  },
  actions: {
    adminLogin: async ({ commit }, { email, password }) => {
      try {
        const auth = getAuth()
        console.log(auth)
        const res: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        await setPersistence(auth, browserLocalPersistence)
        commit('SET_SIGNIN', true)
        return [res.user, null]
      } catch (error: any) {
        const errorCode: string = error.code
        return [null, errorCode]
      }
    },

    adminLogOut: async ({ commit }) => {
      const auth = getAuth()
      await signOut(auth)
      commit('SET_SIGNIN', false)
      ls.remove('user')
    }
  },
}

export default authStore
