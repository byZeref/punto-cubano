<script setup>
defineProps({
  title: String,
})
</script>

<template>
  <div class="mb-5">
    <h3 class="text-2xl text-slate-700 dark:text-white font-semibold">{{ title }}</h3>
    <div class="h-[5px] lg:h-[6px] w-8 lg:w-12 bg-slate-700 dark:bg-white mt-1"></div>
  </div>
</template>

<style scoped>

</style>
