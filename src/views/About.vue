<template>
  <div class="about">
    <img class="avatar" :src="avatar" alt="proladon's avatar" />

    <p class="author">Proladon (綠茶)</p>

    <section class="flex gap-4 justify-center py-5">
      <a href="https://github.com/Proladon" target="_blank">
        <NIcon size="30" color="white">
          <LogoGithub />
        </NIcon>
      </a>
      <a href="https://www.youtube.com/c/Proladon" target="_blank">
        <NIcon size="30" color="white">
          <LogoYoutube />
        </NIcon>
      </a>
    </section>

    <section class="intro">
      嗨嗨 (。・ω・。) <br />
      我是工設研究所畢業的綠茶 ~ <br />
      現在是一為前端工程師
    </section>
  </div>
</template>

<script setup lang="ts">
import avatar from '@/assets/Oreki.png'
import { NIcon } from 'naive-ui'
import { LogoGithub, LogoYoutube } from '@vicons/ionicons5'
</script>

<style lang="postcss" scoped>
.about {
  @apply text-light-800 max-w-[800px];
}

.author {
  @apply text-center py-2 text-xl;
}
.avatar {
  @apply rounded-xl w-[150px] h-[150px] object-cover m-auto;
}

.intro {
  @apply leading-10;
}
</style>
