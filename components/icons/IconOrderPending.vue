<script setup>
defineProps({
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: '24'
  }
})
</script>

<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :width="size"
    :height="size"
    viewBox="0 0 24 24"
    fill="none"
    :stroke="color"
    stroke-width="1.5"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="icon icon-tabler icons-tabler-outline icon-tabler-clock-pause"
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
    <path d="M20.942 13.018a9 9 0 1 0 -7.909 7.922" />
    <path d="M12 7v5l2 2" />
    <path d="M17 17v5" />
    <path d="M21 17v5" />
  </svg>
</template>

