<template>
  <header class="navbar">
    <div class="nav-wrapper">
      <section class="<tablet:hidden">
        <router-link to="/">
          <NButton type="primary" ghost> 填寫申請表單 </NButton>
        </router-link>
      </section>

      <section class="nav-btn-container">
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

      <section class="flex items-center tablet:hidden">
        <NIcon @click="active = !active" color="white" size="30">
          <Menu />
        </NIcon>
      </section>

      <n-drawer v-model:show="active" width="200px" placement="left">
        <n-drawer-content title="Menu" closable>
          <div class="grid gap-4">
            <router-link to="/" @click="active = false">
              <NButton type="primary" ghost block> 填寫申請表單 </NButton>
            </router-link>

            <router-link to="/rules" @click="active = false">
              <NButton block>🔰 規定及注意事項</NButton>
            </router-link>

            <a :href="config.pdfFormLink" target="_blank">
              <NButton block>📄 紙本表單</NButton>
            </a>

            <router-link to="/about" @click="active = false">
              <NButton block>❔ 關於</NButton>
            </router-link>
          </div>
        </n-drawer-content>
      </n-drawer>

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
          <NButton @click="signout" type="primary" ghost block> 登出 </NButton>
        </div>
      </section>
    </div>
  </header>
</template>

<script setup lang="ts">
import { Menu } from '@vicons/ionicons5'
import { NButton, NDrawer, NDrawerContent, NIcon } from 'naive-ui'
import { computed, onMounted, ref } from '@vue/runtime-core'
import ls from 'local-storage'
import { db } from '@/firebase'
import { query, getDocs, where, collection } from 'firebase/firestore'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'

const store = useStore()
const router = useRouter()
const signin = computed(() => store.state.signin)
const config = computed(() => store.state.config)

const active = ref(false)

const signout = () => {
  ls.remove('user')
  store.commit('SET_SIGNIN', false)
  router.push('/')
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
  @apply relative flex items-center  justify-between items-center;
}

.nav-btn-container {
  @apply grid grid-flow-col gap-4;
  @apply <tablet: hidden;
}

.admin-login-btn {
  @apply justify-end items-center text-right w-full;
}
</style>
