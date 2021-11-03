<template>
  <NForm
    :model="formData"
    :rules="formRules"
    ref="formRef"
    :show-feedback="false"
    :show-require-mark="false"
  >
    <NFormItem label="欲借用日期">
      <NDatePicker
        :is-date-disabled="dateDisabled"
        placeholder="選擇借用日期"
      />
    </NFormItem>

    <NButton>08:10 ~ 11:30</NButton>
    <NButton>13:00 ~ 16:30</NButton>
    <NButton>17:00 ~ 22:00</NButton>
    <NButton>全天</NButton>

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
        <div class="w-full flex justify-between gap-2">
          <NFormItem path="renter" :show-label="false">
            <NInput placeholder="姓名" v-model:value="formData.renter" />
          </NFormItem>
          <NFormItem path="renterClassNo" :show-label="false">
            <NInput
              placeholder="班級座號"
              v-model:value="formData.renterClassNo"
            />
          </NFormItem>
          <NFormItem path="renterNo" :show-label="false">
            <NInput placeholder="學號" v-model:value="formData.renterNo" />
          </NFormItem>
          <NFormItem path="renterPhone" :show-label="false">
            <NInput placeholder="電話" v-model:value="formData.renterPhone" />
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
          <NFormItem path="agentNo" :show-label="false">
            <NInput placeholder="學號" v-model:value="formData.agentNo" />
          </NFormItem>
          <NFormItem path="agentPhone" :show-label="false">
            <NInput placeholder="電話" v-model:value="formData.agentPhone" />
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
          :path="`formData.classMate[${index}].name`"
          :show-label="false"
        >
          <NInput
            placeholder="共同使用人"
            v-model:value="formData.classMate[index].name"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`formData.classMate[${index}].classNo`"
          :show-label="false"
        >
          <NInput
            placeholder="班級座號"
            v-model:value="formData.classMate[index].classNo"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`formData.classMate[${index}].no`"
          :show-label="false"
        >
          <NInput
            placeholder="學號"
            v-model:value="formData.classMate[index].no"
          />
        </NFormItem>
        <NFormItem
          ignore-path-change
          :path="`formData.classMate[${index}].phone`"
          :show-label="false"
        >
          <NInput
            placeholder="電話"
            v-model:value="formData.classMate[index].phone"
          />
        </NFormItem>
      </div>
      <NButton class="ml-2" type="error" ghost>
        <template #icon>
          <NIcon>
            <Close />
          </NIcon>
        </template>
      </NButton>
    </NFormItem>

    <NButton dashed block class="mt-5" type="primary" @click="addClassMate">
      <template #icon>
        <NIcon>
          <Add />
        </NIcon>
      </template>
      新增共同使用人</NButton
    >
  </NForm>
  <NDivider />
  <NButton type="primary" block>送出申請</NButton>
</template>

<script setup lang="ts">
import { reactive, ref } from '@vue/runtime-core'
import { Add, Close } from '@vicons/ionicons5'
import {
  NForm,
  NFormItem,
  NInput,
  NDivider,
  NButton,
  NIcon,
  NDatePicker,
} from 'naive-ui'
import rentFormRules from '@/static/rentFormRules'

const formRef = ref(null)
const formData = reactive({
  class: '',
  teacher: '',
  purpose: '',
  tools: '',

  renter: '',
  renterClassNo: '',
  renterNo: '',
  renterPhone: '',
  agent: '',
  agentClassNo: '',
  agentNo: '',
  agentPhone: '',

  classMate: [],
})
const formRules = rentFormRules

const addClassMate = () => {
  if (formData.classMate.length === 10) return
  formData.classMate.push({
    name: '',
    classNo: '',
    no: '',
    phone: '',
  })
}

const dateDisabled = (ts) => {
  // TODO 禁用日期
  const date = new Date(ts).getDate()
  return date < 15
}
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
