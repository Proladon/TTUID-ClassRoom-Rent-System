<template>
  <n-modal
    class="w-[400px]"
    preset="card"
    :title="modalTitle"
    v-model:show="showModal"
    :on-update:show="updateModal"
  >
    <n-form ref="formRef" :model="formData" :rules="formRules">
      <n-form-item label="名稱" path="name">
        <n-input v-model:value="formData.name" placeholder="name" />
      </n-form-item>
      <n-form-item label="templateID" path="templateID">
        <n-input v-model:value="formData.templateID" placeholder="templateID" />
      </n-form-item>
      <n-form-item label="serviceID" path="serviceID">
        <n-input v-model:value="formData.serviceID" placeholder="serviceID" />
      </n-form-item>
      <n-form-item label="userID" path="mailjsUserID">
        <n-input
          v-model:value="formData.mailjsUserID"
          placeholder="mailjsUserID"
        />
      </n-form-item>
    </n-form>
    <div class="flex justify-end">
      <n-button type="primary" @click="save">{{mode === 'edit'? '儲存' : '新增'}}</n-button>
    </div>
  </n-modal>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/reactivity'
import { computed, onMounted } from '@vue/runtime-core'
import { NModal, NForm, NFormItem, NInput, NButton, useMessage } from 'naive-ui'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import { useStore } from 'vuex'
import { clone, find } from 'lodash-es'
import useConfig from '@/use/useConfig'

const emit = defineEmits(['close', 'update'])
const props = defineProps({
  data: {
    type: Object,
    default: () => ({}),
  },
  mode: {
    type: String,
    default: 'create',
  },
})

const message = useMessage()
const store = useStore()
const { db, department, departmentConfig, emailJsSet, updateDepartmentConfig } = useConfig()
const modalTitle = computed(() => {
  if (props.mode === 'create') return '新增帳號'
  return `編輯: ${props.data.name}`
})

const showModal = ref<boolean>(false)
const formRef = ref<any>(null)
const formData = reactive({
  name: '',
  templateID: '',
  serviceID: '',
  mailjsUserID: '',
})
const formRules = {
  name: {
    required: true,
    trigger: 'blur',
  },
  templateID: {
    required: true,
    trigger: 'blur',
  },
  serviceID: {
    required: true,
    trigger: 'blur',
  },
  mailjsUserID: {
    required: true,
    trigger: 'blur',
  },
}

const updateModal = (show: boolean) => {
  showModal.value = show
  if (!show) {
    setTimeout(() => {
      emit('close')
    }, 300)
  }
}

const updateConfig = async () => {
  let newMailjsSet = []
  if(emailJsSet.value) newMailjsSet = JSON.parse(JSON.stringify(emailJsSet.value))
  const itemRef = find(newMailjsSet, { serviceID: props.data.serviceID })

  if (!itemRef) return
  itemRef.name = formData.name
  itemRef.templateID = formData.templateID
  itemRef.serviceID = formData.serviceID
  itemRef.mailjsUserID = formData.mailjsUserID

  await updateDepartmentConfig('mailJsSet', newMailjsSet)
}

const createService = async () => {
  let newMailjsSet = []
  if(emailJsSet.value) newMailjsSet = JSON.parse(JSON.stringify(emailJsSet.value))
  newMailjsSet.push(formData)

  await updateDepartmentConfig('mailJsSet', newMailjsSet)
}

const syncData = () => {
  formData.name = props.data.name
  formData.templateID = props.data.templateID
  formData.serviceID = props.data.serviceID
  formData.mailjsUserID = props.data.mailjsUserID
}

const save = async () => {
  formRef.value.validate(async (errors: any) => {
    if (errors) return
    if (props.mode === 'create') await createService()
    if (props.mode === 'edit') await updateConfig()
    updateModal(false)
  })
}

onMounted(() => {
  showModal.value = true
  if (props.mode === 'edit') syncData()
})
</script>
