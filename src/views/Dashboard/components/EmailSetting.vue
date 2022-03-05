<template>
  <div class="email-setting">
    <n-form>
      <n-form-item label="當前使用帳號">
        <n-select
          placeholder="請選擇帳號"
          v-model:value="selectMailServiceID"
          :options="emailJsSetOptions"
          :on-update:value="handleSelectMailService"
        />
      </n-form-item>

      <n-form-item class="mt-[30px]">
        <template #label>
          <div class="w-full flex justify-between items-center">
            <span>EmailJS 帳號列表</span>
            <n-button
              type="info"
              @click=";(modalMode = 'create'), (showEditModal = true)"
              >新增帳號</n-button
            >
          </div>
        </template>
        <div class="overflow-x-auto w-full">
          <n-table :bordered="false" :single-line="false" class="text-center">
            <thead>
              <tr>
                <th>名稱</th>
                <th>templateID</th>
                <th>serviceID</th>
                <th>UserID</th>
                <th>操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="service in emailJsSet"
                :key="service.name"
              >
                <td>{{ service.name }}</td>
                <td>{{ service.templateID }}</td>
                <td>{{ service.serviceID }}</td>
                <td>{{ service.mailjsUserID }}</td>
                <td>
                  <n-button
                    @click="
                      ;(selectTableItem = service),
                        (modalMode = 'edit'),
                        (showEditModal = true)
                    "
                    >編輯</n-button
                  >
                  <n-button @click="deleteService(service)">刪除</n-button>
                </td>
              </tr>
            </tbody>
          </n-table>
        </div>
      </n-form-item>
    </n-form>

    <EmailServiceEditModal
      v-if="showEditModal"
      :data="selectTableItem"
      :mode="modalMode"
      @close="showEditModal = false"
      @update="refreshConfig"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from '@vue/runtime-core'
import {
  NForm,
  NFormItem,
  NSelect,
  NTable,
  NButton,
  useMessage,
} from 'naive-ui'
import { useStore } from 'vuex'
import { map, findIndex, find } from 'lodash-es'
import { doc, updateDoc } from 'firebase/firestore'
import EmailServiceEditModal from './EmailServiceEditModal.vue'
import useConfig from '@/use/useConfig'

const store = useStore()
const message = useMessage()
const {
  emailJsSet,
  refreshConfig,
  currentEmailjs,
  updateDepartmentConfig,
} = useConfig()

const selectMailServiceID = ref(null)
const selectTableItem = ref(null)
const showEditModal = ref<Boolean>(false)
const modalMode = ref<string>('create')

const emailJsSetOptions = computed(() => {
  return map(emailJsSet.value, (service) => ({
    label: service.name,
    value: service.serviceID,
  }))
})

const handleSelectMailService = async (serviceID) => {
  selectMailServiceID.value = serviceID
  if (serviceID !== currentEmailjs.value?.serviceID) await updateCurrentEmailJs()
}

const deleteService = async (service) => {
  let newMailjsSet = []
  if(emailJsSet.value) newMailjsSet = JSON.parse(JSON.stringify(emailJsSet.value))
  const index = findIndex(newMailjsSet, { serviceID: service.serviceID })
  newMailjsSet.splice(index, 1)

  await updateDepartmentConfig('mailJsSet', newMailjsSet)
  await checkSelectMailService()
}

const updateCurrentEmailJs = async () => {
  const selectMailService = find(emailJsSet.value, {
    serviceID: selectMailServiceID.value,
  })
  await updateDepartmentConfig('currentEmailjs', selectMailService)
}

const checkSelectMailService = async() => {
  if(!currentEmailjs.value) return
  const exist = find(emailJsSet.value, {serviceID: selectMailServiceID.value})
  if(exist) return 
  await updateDepartmentConfig('currentEmailjs', null)
  selectMailServiceID.value = null
}

onMounted(async() => {
  selectMailServiceID.value = currentEmailjs.value?.serviceID || null
  await checkSelectMailService()
})
</script>

<style lang="postcss" scoped>
</style>