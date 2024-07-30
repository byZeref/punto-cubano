export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()
  const { isLogged } = storeToRefs(authStore)

  if (!isLogged.value && PROTECTED_ROUTES.includes(to.name)) {
    return navigateTo('/auth')
  }
})