<script setup>
import IconMenu  from '~/components/icons/IconMenu.vue'

defineEmits(['open'])
const props = defineProps({
  showTriggerButton: {
    type: Boolean,
    default: false,
  },
  isOpen: Boolean,
  isDarkMode: Boolean,
})

</script>

<template>
  <div class="lg:hidden flex items-center gap-2">
    <IconMenu @click="$emit('open')" v-if="showTriggerButton" :color="isDarkMode ? '#fff' : '#7f2c30'" /> 
    <NuxtLink to="/" class="logo-name flex items-center gap-1">
      <img v-show="isDarkMode" class="logo-img w-[50px] h-auto" src="/logo-white.png" alt="logo-app">
      <img v-show="!isDarkMode" class="logo-img w-[50px] h-auto" src="/logo.png" alt="logo-app">
      <span class="font-bold text-[18px]">Punto Cubano</span>
    </NuxtLink>
  </div>
</template>
