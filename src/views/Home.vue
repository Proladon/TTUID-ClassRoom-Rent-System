<template>
  <main class="home">
    <section id="calendar-wrapper" class="block-container"></section>
    <section id="form-wrapper" class="block-container">
      <RentForm />
    </section>
  </main>
</template>

<script setup lang="ts"></script>

<style scoped lang="postcss">
.home {
  @apply grid grid-cols-2 gap-5 max-w-[1400px] m-auto;
  @apply <tablet: grid-cols-1;
}
.block-container {
  @apply bg-[#c5baaf] p-5 rounded-xl bg-opacity-30 shadow-xl;
  transition: 1s;
}
</style>
