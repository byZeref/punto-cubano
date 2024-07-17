<script setup>
const colorMode = useColorMode()
const isDarkMode = computed(() => colorMode.preference === 'dark')

const authStore = useAuthStore()
const toggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}

const logout = () => {
  // TODO logout in api
}

</script>

<template>
  <div class="w-full h-20 bg-white text-slate-600 mb-10">
    <div class="w-full h-full max-w-5xl flex items-center justify-between mx-auto px-10">
      <RouterLink to="/" class="flex items-center gap-2">
        <img class="w-[60px] h-auto" src="/logo.jpg" alt="logo-app">
        <span class="text-[#4C1B1E] font-bold text-xl">Punto Cubano</span>
      </RouterLink>

      <div>
        <RouterLink class="router-link" to="/">Home</RouterLink>
        <RouterLink class="router-link" to="/products">Products</RouterLink>
        <RouterLink v-if="!authStore.isLogged" class="router-link" to="/auth">Login</RouterLink>
        <span v-else @click="logout" class="router-link cursor-pointer">Logout</span>
      </div>

      <div class="flex items center gap-4">
        <div class="cursor-pointer" @click="toggleMode">
          <img v-if="isDarkMode" src="/icons/sun.svg" alt="sun-icon" class="w-6 h-auto">
          <img v-else src="/icons/moon-stars.svg" alt="moon-icon" class="w-6 h-auto">
        </div>
        <div class="cursor-pointer">
          <img src="/icons/language.svg" alt="moon-icon" class="w-6 h-auto">
        </div>
        <div class="cursor-pointer">
          <img src="/icons/shopping-cart.svg" alt="moon-icon" class="w-6 h-auto">
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
