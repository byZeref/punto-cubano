<script setup>
import IconHome from '~/components/icons/IconHome.vue'
import IconShoppingBag  from '~/components/icons/IconShoppingBag.vue'
import IconShoppingCart  from '~/components/icons/IconShoppingCart.vue'
import IconContactUs  from '~/components/icons/IconContactUs.vue'
import IconLogout  from '~/components/icons/IconLogout.vue'
import IconMoon  from '~/components/icons/IconMoon.vue'
import IconSun  from '~/components/icons/IconSun.vue'
import IconLanguage  from '~/components/icons/IconLanguage.vue'
import IconMenu  from '~/components/icons/IconMenu.vue'

const colorMode = useColorMode()
const isDarkMode = useCookie('dark')
const isOpen = ref(false)

const authStore = useAuthStore()
const toggleMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
  isDarkMode.value = colorMode.preference === 'dark'
}

const logout = () => {
  isOpen.value = false
  return authStore.logout()
}

onMounted(() => isDarkMode.value = colorMode.preference === 'dark')

</script>

<template>
  <div :class="['navbar w-full h-20 bg-white text-slate-600 mb-10 border-b-2 border-[var(--primary-color)] dark:bg-[#151d26]', { dark: isDarkMode }]">
    <div class="w-full h-full max-w-5xl flex items-center justify-between mx-auto px-10">
      <NuxtLink to="/" class="logo-name flex items-center gap-2 max-lg:hidden">
        <img class="w-[60px] h-auto" src="/logo.jpg" alt="logo-app">
        <span class="font-bold text-xl">Punto Cubano</span>
      </NuxtLink>

      <div class="max-lg:hidden">
        <NuxtLink class="router-link text-black dark:text-white" to="/">Home</NuxtLink>
        <NuxtLink class="router-link text-black dark:text-white" to="/products">Products</NuxtLink>
        <NuxtLink
          v-if="!authStore.isLogged" 
          class="router-link text-black dark:text-white" 
          to="/auth"
        >
          Login
        </NuxtLink>
        <span v-else @click="logout" class="router-link cursor-pointer text-black dark:text-white">Logout</span>
      </div>

      <div class="lg:hidden" @click="isOpen = true">
        <IconMenu :color="isDarkMode ? '#fff' : 'black'" /> 
      </div>

      <div class="flex items center gap-4">
        <div class="cursor-pointer" @click="toggleMode">
          <IconSun v-if="isDarkMode" :color="isDarkMode ? '#fff' : 'black'" /> 
          <IconMoon v-else :color="isDarkMode ? '#fff' : 'black'" /> 
        </div>
        <div class="cursor-pointer">
          <IconLanguage :color="isDarkMode ? '#fff' : 'black'" /> 
        </div>
        <div class="cursor-pointer">
          <IconShoppingCart :color="isDarkMode ? '#fff' : 'black'" /> 
        </div>
      </div>

      <!-- mobile menu -->
      <!-- TODO cambiar color de iconos en (.active) -->
      <USlideover v-model="isOpen" side="left">
        <div class="p-4 flex-1 dark:bg-[#151d26]">
          <UButton
            color="gray"
            variant="ghost"
            size="sm"
            icon="i-heroicons-x-mark-20-solid"
            class="flex sm:hidden absolute end-5 top-5 z-10"
            square
            padded
            @click="isOpen = false"
          />
          <div class="px-4">  
            <NuxtLink to="/" class="flex items-center gap-2 py-1">
              <span class="text-[#4C1B1E] dark:text-white font-bold text-2xl">Punto Cubano</span>
            </NuxtLink>
            
            <div class="pt-16 flex flex-col gap-7">
              <NuxtLink class="flex items-center gap-2" to="/" @click="isOpen = false">
                <IconHome :color="isDarkMode ? '#fff' : 'black'" />
                <span class="text-lg">Inicio</span>
              </NuxtLink>
              <NuxtLink class="flex items-center gap-2" to="/products" @click="isOpen = false">
                <IconShoppingBag :color="isDarkMode ? '#fff' : 'black'" />
                <span class="text-lg">Productos</span>
              </NuxtLink>
              <NuxtLink class="flex items-center gap-2" to="/products" @click="isOpen = false">
                <IconShoppingCart :color="isDarkMode ? '#fff' : 'black'" />
                <span class="text-lg">Carrito</span>
              </NuxtLink>
              <NuxtLink class="flex items-center gap-2" to="/products" @click="isOpen = false">
                <IconContactUs :color="isDarkMode ? '#fff' : 'black'" />
                <span class="text-lg">Contacténos</span>
              </NuxtLink>
              <NuxtLink v-if="authStore.isLogged" class="flex items-center gap-2" @click="logout">
                <IconLogout :color="isDarkMode ? '#fff' : 'black'" />
                <span class="text-lg">Cerrar Sesión</span>
              </NuxtLink>
            </div>
          </div>
          
        </div>
      </USlideover>
    </div>
  </div>
</template>

<style scoped>

</style>
