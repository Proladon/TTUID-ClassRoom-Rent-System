<template>
  <div id="editor" ref="editor"></div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core'
import Quill from 'quill'
import { useStore } from 'vuex'

const store = useStore()
const emit = defineEmits(['update'])
const quill: any = ref(null)

const departmentConfig = computed(() => store.state.configStore.config)

onMounted(() => {
  quill.value = new Quill('#editor', {
    theme: 'snow',
  })

  quill.value.root.innerHTML = departmentConfig.value.rules

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

.ql-editor {
  @apply !bg-gray-300 text-dark-50;
}
</style>
