<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'

const emit = defineEmits(['update:show', 'refresh'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  entity: {
    type: Object,
    required: true,
  },
  isDarkMode: Boolean,
})
const loading = ref(false)
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})

const remove = async () => {
  loading.value = true
  const { status } = await $fetch('/api/product/remove', { 
    method: 'delete', 
    body: { product: props.entity }
  }).finally(() => { loading.value = false })
  
  if (status === 204) {
    visible.value = false
    emit('refresh')
  }
}
</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    @update:show="(val) => visible = val"
    :prevent-close="loading"
  >
    <template #header>
      <h4 class="text-[var(--error-color)] font-semibold text-xl">Confirmación</h4>
    </template>
    <template #body>
      <span class="text-slate-700 dark:text-slate-200">Seguro que desea eliminar el producto <strong>{{ entity.name }}</strong>?</span>
      <div class="flex items-center gap-[2px] text-red-500 dark:text-slate-200 mt-1">
        <UIcon name="i-heroicons-exclamation-circle" class="min-w-4 min-h-4 lg:min-w-6 lg:min-h-6" />
        <span class="text-xs lg:text-sm">Esta acción no se puede deshacer.</span>
      </div>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton
          class="ml-auto"
          color="red"
          variant="outline"
          size="lg"
          @click="visible = false"
          :disabled="loading"
        >
          <span class="text-center">Cancelar</span>
        </UButton>
        <UButton
          color="red"
          size="lg"
          class="min-w-[90px] flex"
          @click="remove"
          :disabled="loading"
        >
          <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
          <span v-else class="text-center mx-auto">Eliminar</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
