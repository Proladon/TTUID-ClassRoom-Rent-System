interface AuthStatus {
  [key: string]: string
}

export const authStatus: AuthStatus = {
  'auth/user-not-found': '查無此信箱',
  'auth/wrong-password': '密碼錯誤',
}
