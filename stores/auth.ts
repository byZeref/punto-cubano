import type { User, UserData, AuthError } from '@/utils/types'

export const useAuthStore = defineStore('auth', () => {
  const storage = useLocalStorage()
  const router = useRouter()

  const user: Ref<User | undefined> = ref(undefined)
  const access_token: Ref<string | undefined> = ref(undefined)
  const refresh_token: Ref<string | undefined> = ref(undefined)
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
    removeFromLocalStorage('auth')
  }


  const saveUserData = (data: UserData) => {
    user.value = data.user
    access_token.value = data.access_token
    refresh_token.value = data.refresh_token
    saveToLocalStorage('auth', data)
  }

  const saveToLocalStorage = (name: string, data: UserData) => {
    storage.save(name, data)
  }
  const removeFromLocalStorage = (name: string) => {
    storage.remove(name)
  }
  
  const reset = () => {
    user.value = undefined
    access_token.value = undefined
    refresh_token.value = undefined
  }
  
  const loadLocalStorageData = () => {
    user.value = storage.get('auth')?.user
    access_token.value = storage.get('auth')?.access_token
    refresh_token.value = storage.get('auth')?.refresh_token
  }


  return {
    user, isLogged, access_token, refresh_token, 
    loadLocalStorageData, login, logout
  }
})