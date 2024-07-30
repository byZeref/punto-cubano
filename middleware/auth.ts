export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  if (isLogged.value && to.name === 'auth') {
    return navigateTo('/')
  }
})