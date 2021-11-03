<template>
  <n-config-provider :theme-overrides="theme1" :theme="darkTheme">
    <!-- <n-theme-editor> -->
    <Navbar class="app-spacing" />
    <router-view class="main-view app-spacing" />

    <!-- </n-theme-editor> -->
  </n-config-provider>
</template>

<script lang="ts" setup>
import { NConfigProvider, NButton, NThemeEditor, darkTheme } from 'naive-ui'
import theme1 from '@/theme/theme1'
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
