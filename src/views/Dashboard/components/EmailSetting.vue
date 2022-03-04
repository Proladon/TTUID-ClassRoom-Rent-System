<template>
  <div class="email-setting">
    <n-form>
      <n-form-item label="當前使用帳號">
        <n-select
          placeholder="請選擇帳號"
          v-model:value="selectMailService"
          :options="emailJsSetOptions"
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
          <n-table :bordered="false" :single-line="false">
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
                v-for="service in departmentConfig.mailJsSet"
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
import { map, findIndex } from 'lodash-es'
import { doc, updateDoc, getDoc } from 'firebase/firestore'
import EmailServiceEditModal from './EmailServiceEditModal.vue'
import useConfig from '@/use/useConfig'

const store = useStore()
const message = useMessage()
const { db, department, departmentConfig, emailJsSet, refreshConfig } =
  useConfig()

const selectMailService = ref(null)
const selectTableItem = ref(null)
const showEditModal = ref<Boolean>(false)
const modalMode = ref<string>('create')

const emailJsSetOptions = computed(() => {
  return map(departmentConfig.value.mailJsSet, (service) => ({
    label: service.name,
    value: service.serviceID,
  }))
})

const deleteService = async (service) => {
  const configRef = JSON.parse(JSON.stringify(emailJsSet.value))
  const index = findIndex(configRef, { serviceID: service.serviceID })
  configRef.splice(index, 1)

  const deparmentConfigRef = doc(db.value, 'Department', department.value)
  try {
    await updateDoc(deparmentConfigRef, {
      mailJsSet: configRef,
    })
    message.success('更新成功 !')
    await refreshConfig()
  } catch (error: any) {
    console.log(error)
    message.error(error.code)
  }
}

onMounted(() => {
  selectMailService.value = departmentConfig.value.currentEmailjs?.name || null
})
</script>

<style lang="postcss" scoped>
</style>