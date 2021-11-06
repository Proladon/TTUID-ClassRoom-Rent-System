<template>
  <div class="dashbaord">
    <h1>Dashboard</h1>
    <NForm ref="formRef" :model="formData" :rules="formRules">
      <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
        <NInput placeholder="ads" v-model:value="formData.gCalendar" />
      </NFormItem>

      <NFormItem label="EmailJS - User ID" path="mailjsUserID">
        <NInput placeholder="ads" v-model:value="formData.mailjsUserID" />
      </NFormItem>

      <NFormItem label="EmailJS - Service ID" path="serviceID">
        <NInput placeholder="ads" v-model:value="formData.serviceID" />
      </NFormItem>

      <NFormItem label="EmailJS - Template ID" path="templateID">
        <NInput placeholder="ads" v-model:value="formData.templateID" />
      </NFormItem>
    </NForm>

    <div class="text-right">
      <NButton type="primary">儲存設定</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { NButton, NInput, NForm, NFormItem } from 'naive-ui'
import { clone } from 'lodash-es'
import { useStore } from 'vuex'

const store = useStore()
const formRef = ref(null)
const formData = reactive({
  gCalendar: '',
  mailjsUserID: '',
  serviceID: '',
  templateID: '',
})
const formRules = {}

const config = computed(() => store.state.config)

const syncConfig = () => {
  formData.gCalendar = clone(config.value.gCalendar)
  formData.mailjsUserID = clone(config.value.mailjsUserID)
  formData.serviceID = clone(config.value.serviceID)
  formData.templateID = clone(config.value.templateID)
}

onMounted(() => {
  syncConfig()
})
</script>

<style lang="postcss" scoped>
h1 {
  @apply text-[48px] mb-[50px];
}
.dashbaord {
  @apply text-light-800 max-w-[800px];
}
</style>
