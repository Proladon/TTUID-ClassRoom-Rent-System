<template>
  <header class="navbar">
    <div class="nav-wrapper">
      <div class="admin-login-btn">
        <router-link to="/admin-login"> 管理員登入 </router-link>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="postcss" scoped>
.navbar {
  /* @apply bg-[#42f796]; */
  @apply bg-[#c5baaf];
}
.nav-wrapper {
  @apply relative flex items-center h-[50px];
}

.admin-login-btn {
  @apply justify-end items-center text-right w-full;
}
</style>
