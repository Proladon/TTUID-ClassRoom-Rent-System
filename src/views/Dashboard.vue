<template>
  <div class="dashbaord">
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

      <NFormItem label="紙本表單連結" path="pdfFormLink">
        <NInput v-model:value="formData.pdfFormLink" />
      </NFormItem>
    </NForm>

    <section>
      <p class="text-left mb-[5px]">規定及注意事項</p>
      <Editor @update="editing" />
    </section>

    <div class="text-right mt-[30px]">
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
const formRef = ref<any>(null)
const formData = reactive({
  gCalendar: '',
  mailjsUserID: '',
  serviceID: '',
  templateID: '',
  pdfFormLink: '',
  rules: '',
})
const formRules = dashboardFormRules

const config = computed(() => store.state.config)

const editing = (html: string) => {
  formData.rules = html
}

const updateConfig = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    const configRef = doc(db, 'App', 'config')
    try {
      await updateDoc(configRef, {
        ...formData,
      })
      message.success('更新成功 !')
      await refresh()
    } catch (error: any) {
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
  } catch (error: any) {
    message.error(error.code)
  }
}

const syncConfig = () => {
  formData.gCalendar = clone(config.value.gCalendar)
  formData.mailjsUserID = clone(config.value.mailjsUserID)
  formData.serviceID = clone(config.value.serviceID)
  formData.templateID = clone(config.value.templateID)
  formData.rules = clone(config.value.rules)
  formData.pdfFormLink = clone(config.value.pdfFormLink)
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
