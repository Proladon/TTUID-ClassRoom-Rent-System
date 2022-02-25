<template>
  <div class="email-setting">
    <n-form>
      <n-form-item label="當前使用帳號">
        <n-select v-model:value="selectMailService" :options="emailJsSet" />
      </n-form-item>
      <n-form-item label="EmailJS 帳號列表">
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
            <tr v-for="service in departmentConfig.mailJsSet" :key="service.name">
              <td>{{service.name}}</td>
              <td>{{service.templateID}}</td>
              <td>{{service.serviceID}}</td>
              <td>{{service.mailjsUserID}}</td>
              <td>
                <n-button>編輯</n-button>
                <n-button>刪除</n-button>
              </td>
            </tr>
          </tbody>
        </n-table>
      </n-form-item>
    </n-form>

  </div>
</template>

<script setup>
import { computed, onMounted, ref } from '@vue/runtime-core'
import { NForm, NFormItem, NSelect, NTable, NButton } from 'naive-ui'
import { useStore } from 'vuex'
import { map } from 'lodash-es'

const store = useStore()

const selectMailService = ref(null)

const departmentConfig = computed(() => store.state.configStore.config)
const emailJsSet = computed(() => {
  return map(departmentConfig.value.mailJsSet, (service) => ({
    label: service.name,
    value: service.name
  }))
})

onMounted(() => {
  selectMailService.value = departmentConfig.value.currentEmailjs.name
})

</script>

<style lang="postcss" scoped>
</style>