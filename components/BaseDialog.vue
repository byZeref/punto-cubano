<script setup>
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  size: {
    type: String,
    required: false,
    default: 'lg',
  },
  header: {
    type: Boolean,
    required: false,
    default: true,
  },
  footer: {
    type: Boolean,
    required: false,
    default: true,
  },
  preventClose: Boolean,
})
const visible = ref(props.show)
const ui = computed(() => {
  return { padding: 'p-0',  width: `w-full sm:max-w-${props.size}` }
})

watchEffect(() => {
   if (!visible.value) emit('update:show', false)
})

</script>

<template>
  <UModal v-model="visible" :prevent-close="preventClose" :ui="ui">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', rounded: '' }">
      <template #header v-if="header">
        <slot name="header" />
      </template>

      <slot name="body" />

      <template #footer v-if="footer">
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
