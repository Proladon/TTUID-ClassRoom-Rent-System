<template>
  <div class="dashbaord" v-if="departmentConfig">
    <SideMenu @update="tabChange" />
    <div>
      <CommonSetting v-show="curTab === 'common'" />
      <EmailSettings v-show="curTab === 'email'" />
      <RulesSetting v-show="curTab === 'rules'" @update="editing"/>

      <div class="text-right mt-[30px]">
        <NButton type="primary" @click="updateConfig">儲存所有設定</NButton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SideMenu from './components/SideMenu.vue'
import CommonSetting from './components/CommonSetting.vue'
import EmailSettings from './components/EmailSetting.vue'
import RulesSetting from './components/RulesSetting.vue'

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
const curTab = ref<string>('common')
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

const signin = computed(() => store.state.signin)

const tabChange = (tab: string) => {
  curTab.value = tab
}

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
