<template>
  <n-config-provider :theme-overrides="theme1" :theme="darkTheme">
    <NMessageProvider>
      <!-- <n-theme-editor> -->
      <div class="bg-gray-600">
        <Navbar class="app-spacing" v-if="departmentConfig" />
      </div>
      <router-view class="main-view app-spacing" />
      <Footer />

      <!-- </n-theme-editor> -->
    </NMessageProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import Navbar from '@/components/Navbar.vue'
import Footer from '@/components/Footer.vue'
import {
  NConfigProvider,
  NThemeEditor,
  darkTheme,
  NMessageProvider,
} from 'naive-ui'
import theme1 from '@/theme/theme1'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { db } from '@/firebase'
import * as ls from 'local-storage'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'
import { getDepartment } from '@/utils/localstorage'
const store = useStore()
const router = useRouter()
const departmentConfig = computed(() => store.state.configStore.config)


onMounted(async () => {
  store.commit('SET_DB', db)
  const department = getDepartment()
  if(!department) return router.push({name: 'Home'})
  store.commit('SET_DEPARTMENT', department)
  await store.dispatch('getDepartmentConfig', department)
  
  const user: User = ls.get('user')
  if (!user) return

  const now = dayjs(new Date()).unix()
  if (user.exp < now) {
    ls.remove('user')
    store.commit('SET_SIGNIN', false)
  } else if (user.exp > now) {
    store.commit('SET_SIGNIN', true)
  }
})
</script>

<style lang="postcss">
html,
body {
  @apply h-full w-full;
  @apply bg-[#2c3e50];
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  @apply h-full w-full bg-[#2c3e50];
}

.app-spacing {
  @apply max-w-[1480px] px-[40px] m-auto;
  @apply <sm: px-[15px];
}

.main-view {
  @apply py-[50px];
}
</style>
