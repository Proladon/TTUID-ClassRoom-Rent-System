<template>
  <NForm
    :model="formData"
    :rules="formRules"
    ref="formRef"
    :show-feedback="false"
    :show-require-mark="false"
  >
    <NFormItem label="欲借用日期" path="rentDate">
      <DatePeriod
        @date="updateDate"
        @period="updatePeriod"
        :periodErr="periodErr"
      />
    </NFormItem>

    <NDivider />

    <div class="group-container">
      <NFormItem label="課程名稱" path="class">
        <NInput placeholder="請輸入" v-model:value="formData.class" />
      </NFormItem>
      <NFormItem label="授課教師" path="teacher">
        <NInput placeholder="請輸入" v-model:value="formData.teacher" />
      </NFormItem>
      <NFormItem label="用途" path="purpose">
        <NInput placeholder="請輸入" v-model:value="formData.purpose" />
      </NFormItem>
      <NFormItem label="借用器材" path="tools">
        <NInput placeholder="請輸入" v-model:value="formData.tools" />
      </NFormItem>
    </div>

    <NDivider />

    <div class="grid gap-5">
      <!-- 借用人 -->
      <NFormItem label="借用人">
        <div class="user-input-container">
          <NFormItem path="renter" :show-label="false">
            <NInput placeholder="姓名" v-model:value="formData.renter" />
          </NFormItem>
          <NFormItem path="renterClassNo" :show-label="false">
            <NInput
              placeholder="班級座號"
              v-model:value="formData.renterClassNo"
            />
          </NFormItem>
          <NFormItem path="renterID" :show-label="false">
            <NInput placeholder="學號" v-model:value="formData.renterID" />
          </NFormItem>
          <NFormItem path="renterPhone" :show-label="false">
            <NInput
              placeholder="電話"
              maxlength="10"
              v-model:value="formData.renterPhone"
            />
          </NFormItem>
        </div>
      </NFormItem>

      <!-- 代理人 -->
      <NFormItem label-placement="top" label="代理人">
        <div class="user-input-container">
          <NFormItem path="agent" :show-label="false">
            <NInput placeholder="姓名" v-model:value="formData.agent" />
          </NFormItem>
          <NFormItem path="agentClassNo" :show-label="false">
            <NInput
              placeholder="班級座號"
              v-model:value="formData.agentClassNo"
            />
          </NFormItem>
          <NFormItem path="agentID" :show-label="false">
            <NInput placeholder="學號" v-model:value="formData.agentID" />
          </NFormItem>
          <NFormItem path="agentPhone" :show-label="false">
            <NInput
              placeholder="電話"
              maxlength="10"
              v-model:value="formData.agentPhone"
            />
          </NFormItem>
        </div>
      </NFormItem>
    </div>

    <NDivider />

    <NFormItem
      label-placement="top"
      v-for="(mate, index) in formData.classMate"
      :key="`mate-${index}`"
    >
      <div class="user-input-container">
        <NFormItem
          ignore-path-change
          :path="`classMate[${index}].name`"
          :show-label="false"
          :rule="dynamicInputRule"
        >
          <NInput
            placeholder="共同使用人"
            v-model:value="formData.classMate[index].name"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`classMate[${index}].classNo`"
          :show-label="false"
          :rule="dynamicInputRule"
        >
          <NInput
            placeholder="班級座號"
            v-model:value="formData.classMate[index].classNo"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`classMate[${index}].id`"
          :show-label="false"
          :rule="dynamicInputRule"
        >
          <NInput
            placeholder="學號"
            v-model:value="formData.classMate[index].id"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`classMate[${index}].phone`"
          :show-label="false"
          :rule="dynamicInputRule"
        >
          <NInput
            maxlength="10"
            placeholder="電話"
            v-model:value="formData.classMate[index].phone"
          />
        </NFormItem>
      </div>
      <NButton class="ml-2" type="error" ghost @click="removeMate(index)">
        <template #icon>
          <NIcon>
            <Close />
          </NIcon>
        </template>
      </NButton>
    </NFormItem>

    <NButton
      v-if="formData.classMate.length < 10"
      dashed
      block
      class="mt-5"
      type="primary"
      @click="addClassMate"
    >
      <template #icon>
        <NIcon>
          <Add />
        </NIcon>
      </template>
      新增共同使用人</NButton
    >

    <NDivider />
    <NFormItem label="借用人信箱" path="renterEmail">
      <NInput placeholder="電子信箱" v-model:value="formData.renterEmail" />
    </NFormItem>
  </NForm>

  <NDivider />
  <NButton
    type="primary"
    block
    @click="submitForm"
    class="h-[50px]"
    :disabled="cd > 0"
    >送出申請</NButton
  >
</template>

<script setup lang="ts">
import {
  NForm,
  NFormItem,
  NInput,
  NDivider,
  NButton,
  NIcon,
  NDatePicker,
  useMessage,
} from 'naive-ui'
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { Add, Close } from '@vicons/ionicons5'
import { periodConfig } from '@/config/period'
import rentFormRules, { dynamicInputRule } from '@/static/rentFormRules'
import { findIndex, map } from 'lodash-es'
import dayjs from 'dayjs'
import * as ls from 'local-storage'

const emit = defineEmits(['submit'])
const message = useMessage()
// --- Data ---
const cd = ref(0)
const periodErr = ref(false)
const selectedPeriods = ref<number[]>([])
const formRef = ref<any>(null)
const formRules: any = rentFormRules
const formData: RentForm = reactive({
  applyDate: null,
  rentDate: null,
  class: '',
  teacher: '',
  purpose: '',
  tools: '',

  renter: '',
  renterClassNo: '',
  renterID: '',
  renterPhone: '',
  renterEmail: '',
  agent: '',
  agentClassNo: '',
  agentID: '',
  agentPhone: '',

  classMate: [],
  classMateString: '',
  periods: [],
})

// --- Methods ---
const addClassMate = () => {
  if (formData.classMate.length === 10) return
  formData.classMate.push({
    name: '',
    classNo: '',
    id: '',
    phone: '',
  })
}
const removeMate = (index: number) => {
  formData.classMate.splice(index, 1)
}
const updateDate = (date: number) => {
  formData.rentDate = date
}
const updatePeriod = (period: number[]) => {
  selectedPeriods.value = period
}

// => 預處理送出資料
const dataPreprocess = () => {
  formData.rentDate = dayjs(formData.rentDate).format('YYYY-MM-DD')
  formData.applyDate = dayjs(new Date()).format('YYYY-MM-DD')

  const list: string[] = []
  formData.classMate.forEach((user: any) => {
    list.push(
      `【姓名: ${user.name} | 班級座號: ${user.classNo} | 學號: ${user.id} | 電話: ${user.phone}】`
    )
    formData.classMateString = list.join('  ||  ')
  })
  formData.periods = map(
    selectedPeriods.value,
    (period: number): string => periodConfig[period]
  ).join('、')
}

// => 檢查表單與送出資料
const submitForm = () => {
  formRef.value?.validate((errors: any) => {
    if (errors) return
    if (!selectedPeriods.value.length) {
      periodErr.value = true
      message.warning('請選擇借用時段')
      return
    }

    dataPreprocess()
    emit('submit', formData)
  })
}

onMounted(() => {
  const cd = ls.get('cd')
  if (cd) console.log(cd)
})
</script>

<style lang="postcss" scoped>
.group-container {
  @apply grid grid-cols-2 gap-5;
}

.user-input-container {
  @apply grid grid-cols-4 gap-2;
}

@media screen and (max-width: 415px) {
  .user-input-container {
    @apply grid-cols-2;
  }
}
</style>
