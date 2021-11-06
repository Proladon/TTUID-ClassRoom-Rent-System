<template>
  <header class="navbar">
    <div class="nav-wrapper">
      <section>
        <router-link to="/">
          <NButton type="primary" ghost> 填寫申請表單 </NButton>
        </router-link>
      </section>

      <section class="grid grid-flow-col gap-4">
        <router-link to="/rules">
          <NButton>🔰 規定及注意事項</NButton>
        </router-link>

        <a :href="config.pdfFormLink" target="_blank">
          <NButton>📄 紙本表單</NButton>
        </a>

        <router-link to="/about">
          <NButton>❔ 關於</NButton>
        </router-link>
      </section>

      <section>
        <div v-if="!signin">
          <router-link to="/admin-login">
            <NButton type="primary" ghost> 管理員登入 </NButton>
          </router-link>
        </div>

        <div v-if="signin" class="grid grid-cols-2 gap-4">
          <router-link to="/dashboard">
            <NButton type="warning"> 後台管理 </NButton>
          </router-link>
          <NButton @click="signout" type="primary" ghost> 登出 </NButton>
        </div>
      </section>
    </div>
  </header>
</template>

<script setup lang="ts">
import { NButton } from 'naive-ui'
import { computed, onMounted, ref } from '@vue/runtime-core'
import ls from 'local-storage'
import { db } from '@/firebase'
import { doc, query, getDocs, where, collection } from 'firebase/firestore'
import { useStore } from 'vuex'

const store = useStore()
const signin = computed(() => store.state.signin)
const config = computed(() => store.state.config)

const signout = () => {
  ls.remove('user')
  store.commit('SET_SIGNIN', false)
}

onMounted(async () => {
  const user = ls.get('user')
  if (!user) return
  const usersRef = query(collection(db, 'Users'), where('uid', '==', user.uid))
  const userQuery = await getDocs(usersRef)
  if (userQuery.size) store.commit('SET_SIGNIN', true)
})
</script>

<style lang="postcss" scoped>
.navbar {
  /* @apply bg-[#42f796]; */
  /* @apply bg-[#c5baaf]; */
  @apply py-2;
}
.nav-wrapper {
  @apply relative flex items-center h-[50px] justify-between items-center;
}

.admin-login-btn {
  @apply justify-end items-center text-right w-full;
}
</style>
