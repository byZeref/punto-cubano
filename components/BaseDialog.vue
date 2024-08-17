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
  preventClose: Boolean,
})
const visible = ref(props.show)

watchEffect(() => {
   if (!visible.value) emit('update:show', false)
})

</script>

<template>
  <UModal v-model="visible" :prevent-close="preventClose" :ui="ui">
    <UCard :ui="{ ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">
      <template #header>
        <slot name="header" />
      </template>

      <slot name="body" />

      <template #footer>
        <slot name="footer" />
      </template>
    </UCard>
  </UModal>
</template>

<style scoped>

</style>
