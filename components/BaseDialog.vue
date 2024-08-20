<script setup>
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  ui: {
    type: Object,
    required: false,
  },
  footer: {
    type: Boolean,
    required: false,
    default: true,
  },
  preventClose: Boolean,
})
const visible = ref(props.show)
const baseUI = { ...props.ui, ...{ padding: 'p-0' } }

watchEffect(() => {
   if (!visible.value) emit('update:show', false)
})

</script>

<template>
  <UModal v-model="visible" :prevent-close="preventClose" :ui="baseUI">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800', rounded: '' }">
      <template #header>
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
