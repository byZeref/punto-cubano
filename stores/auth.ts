import type { User, UserData, AuthError } from '@/utils/types'

export const useAuthStore = defineStore('auth', () => {
  const user = useCookie<User | undefined>('auth')
  const access_token = useCookie<string | undefined>('ac_token')
  const refresh_token = useCookie<string | undefined>('ref_token')
  const isLogged = computed(() => !!user.value)

  const login = async (payload: object) => {
    const { data, error }: { data?: UserData & { ok: boolean }, error?: AuthError } = await $fetch('/api/auth/login', {
      method: 'post',
      body: payload,
    })
    
    if (data?.ok) {
      // @ts-expect-error - strange error here
      delete data.ok
      saveUserData(data)
    }
    
    return { data, error }
  }

  const logout = async () => {
    await $fetch('/api/auth/logout', { method: 'post' })
    reset()
  }


  const saveUserData = (data: UserData) => {
    user.value = data.user
    access_token.value = data.access_token
    refresh_token.value = data.refresh_token
  }

  const reset = () => {
    user.value = undefined
    access_token.value = undefined
    refresh_token.value = undefined
  }

  return {
    user, isLogged, access_token, refresh_token,
    login, logout,
  }
})