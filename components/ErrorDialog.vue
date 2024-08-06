<script setup>
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  message: {
    type: String,
    required: true,
  }
})

const visible = ref(props.show)

watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})
</script>

<template>
  <BaseDialog v-if="visible" :show="visible" @update:show="(val) => visible = val">
    <template #header>
      <h4 class="text-[var(--error-color)] font-semibold text-xl">Error!</h4>
    </template>
    <template #body>
      <div class="flex items-center gap-1 text-slate-700 dark:text-slate-200">
        <UIcon name="i-heroicons-exclamation-triangle" class="min-w-7 min-h-7" />
        <span>{{ message }}</span>
      </div>
    </template>
    <template #footer>
      <div class="flex">
        <UButton class="ml-auto" color="red" size="lg" @click="visible = false">
          <span class="text-center">Cerrar</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
