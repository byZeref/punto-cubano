interface User {
  email: string,
  role: string,
}
type UserData = {
  user: User,
  access_token: string,
  refresh_token: string,
}

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null)
  const access_token: Ref<string | null> = ref(null)
  const refresh_token: Ref<string | null> = ref(null)
  const isLogged = computed(() => !!user.value)

  const saveUserData = (data: UserData) => {
    user.value = data.user
    access_token.value = data.access_token
    refresh_token.value = data.refresh_token
  }

  // TODO handle data in local storage

  return { user, isLogged, access_token, refresh_token, saveUserData }
})