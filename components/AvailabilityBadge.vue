<script setup>
defineProps({
  available: {
    type: Boolean,
    required: true,
  }
})
</script>

<template>
  <span :class="['text-xs text-medium px-2 py-1 rounded-sm mr-auto my-1',
    available ? 'text-emerald-700 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900' : 'text-red-700 bg-red-100 dark:text-red-300 dark:bg-red-900']"
  >
    {{ available ? 'Disponible' : 'No disponible' }}
  </span>
</template>