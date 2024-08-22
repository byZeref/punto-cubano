<script setup>
import CompanyDesktop from '~/components/navbar/CompanyDesktop.vue'
import CompanyMobile from '~/components/navbar/CompanyMobile.vue'
import ActionButtons from '~/components/navbar/ActionButtons.vue'
import DesktopLinks from '~/components/navbar/DesktopLinks.vue'
import MobileMenu from '~/components/navbar/MobileMenu.vue'

const router = useRouter()
const colorMode = useColorMode()
const isDarkMode = useCookie('dark')
const isOpen = ref(false)
const cartStore = useCartStore()
const authStore = useAuthStore()

const productsCount = computed(() => cartStore.count)

const toggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  isDarkMode.value = colorMode.preference === 'dark'
}

const logout = async () => {
  isOpen.value = false
  await authStore.logout()
  router.push('/')
}

onMounted(() => isDarkMode.value = colorMode.preference === 'dark')

</script>

<template>
  <div :class="['navbar w-full h-14 lg:h-16 bg-white text-slate-600 mb-10 dark:bg-[#151d26] z-50', { dark: isDarkMode }]">
    <div class="w-full h-full max-w-6xl flex items-center justify-between mx-auto px-5 lg:px-10">
      <CompanyDesktop :is-dark-mode="isDarkMode" />

      <DesktopLinks :is-logged="authStore.isLogged" :logout="logout" />

      <CompanyMobile
        show-trigger-button
        :is-open="isOpen"
        :is-dark-mode="isDarkMode"
        @open="isOpen = true"
      />

      <ActionButtons :is-dark-mode="isDarkMode" :toggle-mode="toggleMode" :products-count="productsCount" />

      <MobileMenu
        v-if="isOpen"
        :is-open="isOpen"
        :is-logged="authStore.isLogged"
        :is-dark-mode="isDarkMode"
        :logout="logout" 
        @close="isOpen = false"
      />
    </div>
  </div>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.355);
}
</style>
