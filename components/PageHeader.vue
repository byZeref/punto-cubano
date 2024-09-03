<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <div class="mb-5">
    <h3 class="text-2xl text-[var(--primary-color)] dark:text-white text-semibold">{{ title }}</h3>
    <div class="h-[5px] lg:h-[6px] w-8 lg:w-12 bg-[var(--primary-color)] dark:bg-white mt-1"></div>
  </div>
</template>

<style scoped>

</style>
