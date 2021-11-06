export default {
  rentDate: {
    required: true,
    type: 'number',
    trigger: 'blur',
  },
  class: {
    required: true,
    trigger: 'blur',
  },
  teacher: {
    required: true,
    trigger: 'blur',
  },
  purpose: {
    required: true,
    trigger: 'blur',
  },
  tools: {
    required: true,
    trigger: 'blur',
  },

  renter: {
    required: true,
    trigger: 'blur',
  },
  renterClassNo: {
    required: true,
    trigger: 'blur',
  },
  renterID: {
    required: true,
    trigger: 'blur',
  },
  renterPhone: {
    required: true,
    trigger: 'blur',
  },
  renterEmail: {
    required: true,
    trigger: 'blur',
  },

  agent: {
    required: true,
    trigger: 'blur',
  },
  agentClassNo: {
    required: true,
    trigger: 'blur',
  },
  agentID: {
    required: true,
    trigger: 'blur',
  },
  agentPhone: {
    required: true,
    trigger: 'blur',
  },
}

export const dynamicInputRule = {
  trigger: 'input',
  validator(rule, value) {
    if (!value.length) return new Error('')
    if (value.length >= 5) return new Error('')
    return true
  },
}
