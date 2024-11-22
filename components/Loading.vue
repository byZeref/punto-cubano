<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'
</script>

<template>
  <div class="loading-screen fixed top-0 left-0 right-0 z-[9000] w-screen h-screen bg-black/50 dark:bg-gray-800/75 flex items-center justify-center">
    <IconSpinner color="#fff" size="30" />
  </div>
</template>

<style scoped>
</style>
