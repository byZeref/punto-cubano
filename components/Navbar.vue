<script setup>
const colorMode = useColorMode()
const isDarkMode = useCookie('dark')

const authStore = useAuthStore()
const toggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  isDarkMode.value = colorMode.preference === 'dark'
}

const logout = () => {
  return authStore.logout()
}

onMounted(() => isDarkMode.value = colorMode.preference === 'dark')

</script>

<template>
  <div class="w-full h-20 bg-white text-slate-600 mb-10">
    <div class="w-full h-full max-w-5xl flex items-center justify-between mx-auto px-10">
      <NuxtLink to="/" class="flex items-center gap-2">
        <img class="w-[60px] h-auto" src="/logo.jpg" alt="logo-app">
        <span class="text-[#4C1B1E] font-bold text-xl">Punto Cubano</span>
      </NuxtLink>

      <div>
        <NuxtLink class="router-link" to="/">Home</NuxtLink>
        <NuxtLink class="router-link" to="/products">Products</NuxtLink>
        <NuxtLink v-if="!authStore.isLogged" class="router-link" to="/auth">Login</NuxtLink>
        <span v-else @click="logout" class="router-link cursor-pointer">Logout</span>
      </div>

      <div class="flex items center gap-4">
        <div class="cursor-pointer" @click="toggleMode">
          <img v-if="isDarkMode" src="/icons/sun.svg" alt="sun-icon" class="w-6 h-auto">
          <img v-else src="/icons/moon-stars.svg" alt="moon-icon" class="w-6 h-auto">
        </div>
        <div class="cursor-pointer">
          <img src="/icons/language.svg" alt="lang-icon" class="w-6 h-auto">
        </div>
        <div class="cursor-pointer">
          <img src="/icons/shopping-cart.svg" alt="cart-icon" class="w-6 h-auto">
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.router-link{ 
  padding: 16px;
  font-weight: 500;
  &-active {
    color: var(--primary-color);
  }
}
</style>
