<template>
  <Navbar />
  <router-view class="viewer" />
</template>

<script lang="ts" setup></script>

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

.viewer {
  @apply max-w-[1400px] m-auto py-[50px] px-[40px];
}
</style>
