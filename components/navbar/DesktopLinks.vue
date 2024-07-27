<script setup>
defineProps({
  isLogged: Boolean,
  logout: Function,
})
</script>

<template>
  <div class="max-lg:hidden">
    <NuxtLink class="router-link text-slate-700 dark:text-white" to="/">Inicio</NuxtLink>
    <NuxtLink class="router-link text-slate-700 dark:text-white" to="/products">Productos</NuxtLink>
    <NuxtLink
      v-if="!isLogged"
      class="router-link text-slate-700 dark:text-white" 
      to="/auth"
    >
      Iniciar Sesión
    </NuxtLink>
    <span v-else @click="logout" class="router-link cursor-pointer text-black dark:text-white">Cerrar Sesión</span>
  </div>
</template>