<template>
  <div class="dashbaord" v-if="departmentConfig">
    <NForm ref="formRef" :model="formData" :rules="formRules">
      <NFormItem label="Google 月曆嵌入網址" path="gCalendar">
        <NInput v-model:value="formData.gCalendar" />
      </NFormItem>

      <NFormItem label="EmailJS" path="mailService">
        <n-select v-model:value="formData.mailService" :options="emailJsSet" />
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
      <RulesEditor @update="editing" />
    </section>

    <div class="text-right mt-[30px]">
      <NButton type="primary" @click="updateConfig">儲存設定</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import RulesEditor from './components/RulesEditor.vue'
import { computed, onMounted, reactive, ref, watch } from '@vue/runtime-core'
import { NButton, NSelect, NInput, NForm, NFormItem, useMessage } from 'naive-ui'
import { clone, map } from 'lodash-es'
import { useStore } from 'vuex'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { db } from '@/firebase'
import dashboardFormRules from '@/static/dashboardFormRules'
import { useRouter } from 'vue-router'
import { getDepartment } from '@/utils/localstorage'

const store = useStore()
const router = useRouter()
const message = useMessage()
const formRef = ref<any>(null)
const formData = reactive({
  gCalendar: '',
  mailjsUserID: '',
  serviceID: '',
  templateID: '',
  pdfFormLink: '',
  rules: '',
  mailService: ''
})
const formRules = dashboardFormRules

const departmentConfig = computed(() => store.state.configStore.config)
const emailJsSet = computed(() => {
  return map(departmentConfig.value.mailJsSet, (service) => ({
    label: service.name,
    value: service.name
  }))
})
const signin = computed(() => store.state.signin)

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
  const department = getDepartment()
  await store.dispatch('getDepartmentConfig', department)
  syncConfig()
}

const syncConfig = () => {
  formData.gCalendar = clone(departmentConfig.value.gCalendar)
  formData.rules = clone(departmentConfig.value.rules)
  formData.mailService = clone(departmentConfig.value.currentEmailjs?.name)
  // formData.mailjsUserID = clone(config.value.mailjsUserID)
  // formData.serviceID = clone(config.value.serviceID)
  // formData.templateID = clone(config.value.templateID)
  // formData.pdfFormLink = clone(config.value.pdfFormLink)
}

watch(signin, () => {
  // if (!signin.value) router.push('/')
})

onMounted(async () => {
  // const user: User = ls.get('user')
  // if (!user || !signin.value) router.push('/')
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
