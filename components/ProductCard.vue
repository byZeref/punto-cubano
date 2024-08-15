<script setup>
const props = defineProps({
  data: {
    type: Object,
    required: true,
  }
})
</script>

<template>
  <UCard>
    <span>{{ data.name }}</span>
  </UCard>
</template>

<style scoped>

</style>
