<script setup>
import IconMoon  from '~/components/icons/IconMoon.vue'
import IconSun  from '~/components/icons/IconSun.vue'
import IconLanguage  from '~/components/icons/IconLanguage.vue'
import IconShoppingCart  from '~/components/icons/IconShoppingCart.vue'

const props = defineProps({
  isDarkMode: Boolean,
  productsCount: Number,
  toggleMode: Function,
})
const showBadge = ref(props.productsCount > 0)
const isBadgeAnimated = ref(false)
watch(() => props.productsCount, (val) => {
  if (val === 0) {
    setTimeout(() => { showBadge.value = false }, 300)
  } else {
    showBadge.value ||= true
    isBadgeAnimated.value = true
    setTimeout(() => { isBadgeAnimated.value = false }, 300)
  }
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
    <div class="cursor-pointer p-[6px] rounded-md hover:bg-gray-300 dark:hover:bg-gray-700 relative">
      <IconShoppingCart :color="isDarkMode ? '#fff' : '#4c1b1e'" />
      <div
        v-if="showBadge"
        :class="[
          'product-count absolute top-0 right-0 bg-sky-400 dark:text-sky-600 rounded-full w-[18px] h-[18px] flex items-center justify-center',
          { animated: isBadgeAnimated, isZero: productsCount === 0 },
        ]"
      >
        <span class="text-xs font-medium tracking-tight text-white dark:text-black">{{ productsCount }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
@keyframes bounce {
  0%, 100% { scale: 1; }
  50% { scale: 1.4; }
}
@keyframes dissapear {
  0% { scale: 1; opacity: 1; }
  100% { scale: 0; opacity: 0; }
}
.product-count {
  &.animated {
    animation: bounce 300ms linear;
  }
  &.isZero {
    animation: dissapear 300ms linear;
  }
}
</style>