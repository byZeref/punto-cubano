<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'

const { ERR_INTERNET_CONNECTION } = errorMessages
const { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } = notificationTypes
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
  const { data, status } = await useFetch('/api/product/remove', {
    method: 'DELETE',
    body: { product: props.entity },
    onRequestError({ request, response, options }) {
      notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
    },
    onResponseError({ request, response, options }) {
      console.log('response error', response)
      notify(response._data.message, NOTIFICATION_ERROR)
    },
    onResponse({ request, response, options }) {
      console.log('response', response)
      const { status, message } = response._data
      if (status !== 204) {
        notify(message, NOTIFICATION_ERROR)
      }
    }
  }).finally(() => { loading.value = false })
  
  const success = status.value === 'success'
  if (success) {
    visible.value = false
    emit('refresh')
    notify('Producto eliminado exitosamente', NOTIFICATION_SUCCESS)
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
      <h4 class="text-[var(--error-color)] text-medium text-lg">Confirmación</h4>
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
          <span class="text-center text-medium">Cancelar</span>
        </UButton>
        <UButton
          color="red"
          size="lg"
          class="min-w-[90px] flex"
          @click="remove"
          :disabled="loading"
        >
          <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
          <span v-else class="text-center text-medium mx-auto">Eliminar</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
