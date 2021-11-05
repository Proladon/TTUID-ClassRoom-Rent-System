<template>
  <main class="admin-login">
    <LoginForm @signin="" />
  </main>
</template>

<script setup lang="ts">
import { onMounted } from '@vue/runtime-core'
import { getAuth } from 'firebase/auth'

onMounted(() => {
  console.log(getAuth())
})
</script>

<style lang="postcss" scoped>
.admin-login {
  @apply max-w-[500px];
}
</style>
