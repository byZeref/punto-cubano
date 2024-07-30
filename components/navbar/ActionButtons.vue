<script setup>
import IconMoon  from '~/components/icons/IconMoon.vue'
import IconSun  from '~/components/icons/IconSun.vue'
import IconLanguage  from '~/components/icons/IconLanguage.vue'
import IconShoppingCart  from '~/components/icons/IconShoppingCart.vue'

defineProps({
  isDarkMode: Boolean,
  toggleMode: Function,
})

</script>

<template>
  <div class="flex items-center gap-1">
    <div class="cursor-pointer p-[6px] rounded-md hover:bg-gray-300 dark:hover:bg-gray-700" @click="toggleMode">
      <IconSun v-if="isDarkMode" color="#fff" /> 
      <IconMoon v-else color="#4c1b1e" /> 
    </div>
    <div class="cursor-pointer p-[6px] rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
      <IconLanguage :color="isDarkMode ? '#fff' : '#4c1b1e'" /> 
    </div>
    <div class="cursor-pointer p-[6px] rounded-md hover:bg-gray-300 dark:hover:bg-gray-700">
      <IconShoppingCart :color="isDarkMode ? '#fff' : '#4c1b1e'" /> 
    </div>
  </div>
</template>