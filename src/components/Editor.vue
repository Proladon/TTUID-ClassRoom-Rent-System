<template>
  <div id="editor" ref="editor"></div>
  <div @click="test">sadfasd</div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core'
import Quill from 'quill'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['update'])
const editor = ref(null)
const quill = ref(null)

const config = computed(() => store.state.config)

const test = () => {
  console.log(quill.value.root.innerHTML)
}

onMounted(() => {
  quill.value = new Quill('#editor', {
    theme: 'snow',
  })

  quill.value.root.innerHTML = config.value.rules

  quill.value.on('text-change', () =>
    emit('update', quill.value.root.innerHTML)
  )
})
</script>

<style lang="postcss">
@import url('https://cdn.quilljs.com/1.3.6/quill.snow.css');
.ql-toolbar {
  @apply !bg-[#63e2b7];
}
</style>
