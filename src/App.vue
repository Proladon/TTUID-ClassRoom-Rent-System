<template>
  <n-config-provider :theme-overrides="theme1" :theme="darkTheme" v-if="config">
    <NMessageProvider>
      <!-- <n-theme-editor> -->
      <div class="bg-gray-600">
        <Navbar class="app-spacing" />
      </div>
      <router-view class="main-view app-spacing" />
      <Footer />

      <!-- </n-theme-editor> -->
    </NMessageProvider>
  </n-config-provider>
</template>

<script lang="ts" setup>
import {
  NConfigProvider,
  NButton,
  NThemeEditor,
  darkTheme,
  NMessageProvider,
} from 'naive-ui'
import theme1 from '@/theme/theme1'
import { computed, onMounted } from '@vue/runtime-core'
import { useStore } from 'vuex'
import { getDoc, doc } from 'firebase/firestore'
import { db } from '@/firebase'

const store = useStore()
const config = computed(() => store.state.config)

onMounted(async () => {
  const configRef = await getDoc(doc(db, 'App', 'config'))
  const config = configRef.data()
  store.commit('SET_CONFIG', config)
  store.commit('SET_DB', db)
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

  @apply h-full w-full;
  @apply bg-[#2c3e50];
  /* @apply !bg-no-repeat bg-cover;
  background: url('@/assets/bg.jpg'); */
}

.app-spacing {
  @apply max-w-[1480px] px-[40px] m-auto;
  @apply <sm: px-[15px];
}

.main-view {
  @apply py-[50px];
}
</style>
