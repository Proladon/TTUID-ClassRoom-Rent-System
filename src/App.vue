<template>
  <n-config-provider :theme-overrides="theme1">
    <n-theme-editor>
      <Navbar class="app-spacing" />
      <router-view class="main-view app-spacing" />
      <n-button>TEST</n-button>
    </n-theme-editor>
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, NButton, darkTheme, NThemeEditor } from 'naive-ui'
import theme1 from '@/theme/theme1.ts'
</script>

<style lang="postcss">
html,
body {
  @apply h-full w-full;
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
}

.main-view {
  @apply py-[50px];
}
</style>
