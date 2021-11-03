<template>
  <header class="navbar">
    <div class="nav-wrapper">
      <div class="app-title">
        <h1>TTU 工設系攝影教室租借線上申請表單</h1>
      </div>
      <div class="admin-login-btn">
        <router-link to="/admin-login"> 管理員登入 </router-link>
      </div>
    </div>
  </header>
</template>

<script setup></script>

<style lang="postcss" scoped>
.navbar {
  @apply bg-[#42f796];
}
.nav-wrapper {
  @apply relative flex items-center h-[50px];
}

.app-title {
  @apply absolute top-0 left-0 right-0 bottom-0 m-auto pointer-events-none;
  @apply grid place-content-center;
}

.admin-login-btn {
  @apply justify-end items-center text-right w-full;
}
</style>
