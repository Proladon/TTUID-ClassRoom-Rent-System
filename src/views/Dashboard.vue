<template>
  <div class="dashbaord">
    <h1>Dashboard</h1>
    <NForm ref="formRef" :model="formData" :rules="formRules">
      <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
        <NInput v-model:value="formData.gCalendar" />
      </NFormItem>

      <NFormItem label="EmailJS - User ID" path="mailjsUserID">
        <NInput v-model:value="formData.mailjsUserID" />
      </NFormItem>

      <NFormItem label="EmailJS - Service ID" path="serviceID">
        <NInput v-model:value="formData.serviceID" />
      </NFormItem>

      <NFormItem label="EmailJS - Template ID" path="templateID">
        <NInput v-model:value="formData.templateID" />
      </NFormItem>
    </NForm>

    <div class="text-right">
      <NButton type="primary" @click="updateConfig">儲存設定</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, reactive, ref } from '@vue/runtime-core'
import { NButton, NInput, NForm, NFormItem, useMessage } from 'naive-ui'
import { clone } from 'lodash-es'
import { useStore } from 'vuex'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import dashboardFormRules from '@/static/dashboardFormRules'

const store = useStore()
const message = useMessage()
const formRef = ref(null)
const formData = reactive({
  gCalendar: '',
  mailjsUserID: '',
  serviceID: '',
  templateID: '',
})
const formRules = dashboardFormRules

const config = computed(() => store.state.config)

const updateConfig = async () => {
  formRef.value.validate(async (errors) => {
    if (errors) return
    const configRef = doc(db, 'App', 'config')
    try {
      await updateDoc(configRef, {
        ...formData,
      })
      message.success('更新成功 !')
      await refresh()
    } catch (error) {
      console.log(error)
      message.error(error.code)
    }
  })
}

const refresh = async () => {
  try {
    const configRef = await getDoc(doc(db, 'App', 'config'))
    const config = configRef.data()
    store.commit('SET_CONFIG', config)
    store.commit('SET_DB', db)
    syncConfig()
  } catch (error) {
    message.error(error.code)
  }
}

const syncConfig = () => {
  formData.gCalendar = clone(config.value.gCalendar)
  formData.mailjsUserID = clone(config.value.mailjsUserID)
  formData.serviceID = clone(config.value.serviceID)
  formData.templateID = clone(config.value.templateID)
}

onMounted(async () => {
  await refresh()
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
