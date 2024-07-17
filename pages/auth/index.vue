<script setup>
definePageMeta({
  layout: "auth",
})

const authStore = useAuthStore()
const router = useRouter()
const form = ref({
  email: 'sandorsc941018@gmail.com',
  password: 'Zeref.cubano',
})

const login = async () => {
  const payload = { ...form.value }
  const { data, error } = await $fetch('/api/auth/login', {
    method: 'post',
    body: payload,
  })
  if (error) {
    console.error('error', error)
    if (error.status === 400 && error.name === 'AuthApiError') {
      // TODO handle error with modal
      console.log('invalid credentials');
    }
    return
  }

  console.log(data)
  authStore.saveUserData(data)
  return router.push('/admin')
}

</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <UCard>
      <h3 class="text-2xl text-center">Login Page</h3>
      <form @submit.prevent="login">
        <div class="max-w-xs flex flex-col gap-4 items-center mx-auto mt-4">
          <UInput
            v-model="form.email"
            color="cyan"
            type="text"
            size="sm"
            icon="i-heroicons-envelope" 
            placeholder="Usuario"
            class="w-full"
            />
            <UInput
            v-model="form.password"
            color="cyan"
            type="password"
            size="sm"
            icon="i-heroicons-lock-closed" 
            placeholder="Contraseña"
            class="w-full"
          />
          <UButton type="submit" color="cyan" block>
            <span class="text-center">Iniciar Sesión</span>
          </UButton>
        </div>
      </form>
    </UCard>
  </div>
</template>

<style scoped>
.navbar {
  padding: 0 calc(20vw);
}
</style>
