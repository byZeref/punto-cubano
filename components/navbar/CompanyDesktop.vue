<script setup>
defineProps({
  isDarkMode: Boolean,
})

</script>

<template>
  <NuxtLink to="/" class="logo-name flex items-center gap-1 max-lg:hidden">
    <img v-show="isDarkMode" class="logo-img w-[60px] h-auto" src="/logo-white.png" alt="logo-app">
    <img v-show="!isDarkMode" class="logo-img w-[60px] h-auto" src="/logo.png" alt="logo-app">
    <span class="text-bold text-xl">Punto Cubano</span>
  </NuxtLink>
</template>