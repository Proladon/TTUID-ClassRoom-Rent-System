import { Module } from 'vuex'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

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
    adminLogin: async ({commit}, {email, password}) => {
      try {
        const res: any = await signInWithEmailAndPassword(
          getAuth(),
          email,
          password
        )
        commit('SET_SIGNIN', true)
        return [res.user, null]
      } catch (error: any) {
        const errorCode: string = error.code
        return [null, errorCode]
      }
    }
  },
}

export default authStore
