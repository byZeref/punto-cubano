<script setup>
defineProps({
  isLogged: Boolean,
  logout: Function,
})
</script>

<template>
  <div class="max-lg:hidden">
    <NuxtLink 
      class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100" 
      to="/"
    >Inicio</NuxtLink>
    <NuxtLink 
      class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100" 
      to="/products"
    >Productos</NuxtLink>
    <NuxtLink 
      class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100" 
      to="/cart"
    >Carrito</NuxtLink>
    <NuxtLink
    class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100"
    to="/contact"
    >Contáctenos</NuxtLink>
    <NuxtLink
      v-if="isLogged"
      class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100" 
      to="/admin"
    >Administrar</NuxtLink>
    <NuxtLink
      v-if="!isLogged"
      class="router-link text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100"
      to="/auth"
    >Login</NuxtLink>
    <span
      v-if="isLogged" 
      @click="logout" 
      class="router-link cursor-pointer text-slate-700 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 hover:text-[#7f2c30] duration-100"
    >Cerrar Sesión</span>
  </div>
</template>