<template>
  <main class="admin-login">
    <LoginForm />
  </main>
</template>

<script setup lang="ts">
import LoginForm from './components/LoginForm.vue'
</script>

<style lang="postcss" scoped>
.admin-login {
  @apply max-w-[500px];
}
</style>
