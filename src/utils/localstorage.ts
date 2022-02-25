import * as ls from 'local-storage'
import dayjs from 'dayjs'

export const getDepartment = (): string | null => {
  return ls.get('department') || null
}
export const saveDepartment = (department: string) => {
  ls.set('department', department)
}

export const saveUser = (user: User) => {
  ls.set('user', {
    name: user,
    uid: user.uid,
    exp: dayjs(new Date()).add(1, 'd').unix(),
  })
}