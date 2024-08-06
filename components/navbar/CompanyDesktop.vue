<script setup>
defineProps({
  isDarkMode: Boolean,
})

</script>

<template>
  <NuxtLink to="/" class="logo-name flex items-center gap-1 max-lg:hidden">
    <!-- <img v-if="isDarkMode" class="logo-img w-[60px] h-auto" src="/logo-dark.png" alt="logo-app">
    <img v-else class="logo-img w-[60px] h-auto" src="/logo.png" alt="logo-app"> -->
    <img class="logo-img w-[60px] h-auto" src="/logo.png" alt="logo-app">
    <span class="font-bold text-xl">Punto Cubano</span>
  </NuxtLink>
</template>