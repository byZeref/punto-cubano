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
  <div class="lg:hidden flex items-center gap-3" @click="$emit('open')">
    <IconMenu v-if="showTriggerButton" :color="isDarkMode ? '#fff' : '#7f2c30'" /> 
    <NuxtLink @click.stop to="/" class="logo-name flex items-center gap-2">
      <img class="logo-img w-[40px] h-auto" src="/logo.jpg" alt="logo-app">
      <span class="font-bold text-[18px]">Punto Cubano</span>
    </NuxtLink>
  </div>
</template>
