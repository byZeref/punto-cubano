<script setup>
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  is2xl: {
    type: Boolean,
    required: false,
    default: false,
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
  const maxWidth = props.is2xl ? 'sm:max-w-2xl' : 'sm:max-w-lg'
  return { padding: 'p-0',  width: `w-full ${maxWidth}` }
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
