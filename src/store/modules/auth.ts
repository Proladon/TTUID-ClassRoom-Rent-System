import { Module } from 'vuex'
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  setPersistence, 
  browserLocalPersistence, 
  signOut ,
} from 'firebase/auth'
import { getDoc, doc } from 'firebase/firestore'
import * as ls from 'local-storage'
import { find } from 'lodash-es'
import { saveUser } from '@/utils/localstorage'

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
    adminLogin: async ({ commit, dispatch }, { email, password }) => {
      try {
        const auth = getAuth()
        const res: any = await signInWithEmailAndPassword(
          auth,
          email,
          password
        )
        const existAdmin = await dispatch('findUser', res.user.uid)
        
        if(!existAdmin) {
          // 此系所查無此管理員
          await dispatch('adminLogOut')
          return 'department admin 404'
        }
        if(existAdmin) {
          commit('SET_SIGNIN', true)
          await setPersistence(auth, browserLocalPersistence)
          commit('SET_USER', existAdmin)
          saveUser(res.user)
          return null
        }
      } catch (error: any) {
        const errorCode: string = error.code
        return errorCode
      }
    },

    adminLogOut: async ({ commit }) => {
      const auth = getAuth()
      await signOut(auth)
      commit('SET_SIGNIN', false)
      ls.remove('user')
    },

    findUser: async ({ commit, rootState }, userUID) => {
      const db = rootState.db
      const department = rootState.department
      const configRef = await getDoc(doc(db, 'Admins', department))
      const admins = configRef.data()

      const isExist = find(admins, { uid: userUID })
      return isExist
    }
  },
}

export default authStore
