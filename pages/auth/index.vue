<script setup lang="ts">
import IconSpinner from '~/components/icons/IconSpinner.vue'
definePageMeta({
  layout: "auth",
  middleware: 'auth',
})

const { BTN_PRIMARY } = buttons_ui
const authStore = useAuthStore()
const router = useRouter()
const passwordType = ref('password')
const loading = ref(false)
const form = ref({
  email: 'sandorsc941018@gmail.com',
  password: 'Zeref.cubano',
})
const error = inject('error') as Ref<string | null>

const login = async () => {
  const payload = { ...form.value }
  loading.value = true
  const { data, error: e } = await authStore.login(payload)
    .finally(() => { loading.value = false })

  if (e) {
    console.error('error on login', e)
    error.value = handleError(e)!
  }
  else if (data) {
    return router.push('/admin')
  }
}

const togglePasswordType = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <UCard class="w-[500px] max-w-[90%]">
      <div class="logo-container flex items-center justify-center gap-1">
        <img class="logo-img w-[160px] h-auto" src="/logo.png" alt="logo-app">
      </div>
      <div class="w-full px-2">
        <h3 class="text-center text-medium text-slate-800 dark:text-white text-lg leading-[24px] ">
          Ingrese sus credenciales para iniciar sesión
        </h3>
      </div>
      <form @submit.prevent="login" class="pb-6">
        <div class="max-w-[90%] flex flex-col gap-4 items-center mx-auto mt-4">
          <UInput
            v-model="form.email"
            type="text"
            color="white"
            size="xl"
            icon="i-heroicons-envelope" 
            placeholder="Usuario"
            class="w-full"
            :disabled="loading"
          />
          <UInput
            v-model="form.password"
            :type="passwordType"
            color="white"
            size="xl"
            icon="i-heroicons-lock-closed" 
            placeholder="Contraseña"
            class="w-full"
            :disabled="loading"
          >
            <template #trailing>
              <UIcon
                v-if="passwordType === 'password'"
                @click="togglePasswordType"
                name="i-heroicons-eye"
                class="w-5 h-5 text-slate-400 active:scale-[0.85] duration-200" 
              />
              <UIcon
                v-else
                @click="togglePasswordType"
                name="i-heroicons-eye-slash"
                class="w-5 h-5 text-slate-400 active:scale-[0.85] duration-200" 
              />
            </template>
          </UInput>
          <UButton
            type="submit"
            color="primary"
            size="xl"
            block
            :ui="BTN_PRIMARY"
            :disabled="loading"
            class="min-h-[44px]"
          >
            <IconSpinner v-if="loading" color="#fff" class="text-center mx-auto" />
            <span v-else class="text-center">Iniciar Sesión</span>
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<style scoped>
:deep(span.absolute.inset-y-0.end-0.pointer-events-none) {
  pointer-events: all !important;
  cursor: pointer !important;
}
</style>
