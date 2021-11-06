interface RentForm {
  applyDate: null | number | string
  rentDate: null | number | string
  class: ''
  teacher: ''
  purpose: ''
  tools: ''

  renter: ''
  renterClassNo: ''
  renterID: ''
  renterPhone: ''
  renterEmail: ''
  agent: ''
  agentClassNo: ''
  agentID: ''
  agentPhone: ''

  classMate: Array<classMate>
  classMateString: string
  periods: string[] | number[] | string
}

interface classMate {
  name: string
  classNo: string
  id: string
  phone: string
}

interface User {
  uid: string
  name: string
  exp: number
}
