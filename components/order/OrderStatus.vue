<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'
import { order_status, order_status_options as options } from '~/utils/constants'
const { ORDER_PENDING, ORDER_SENT, ORDER_DELIVERED, ORDER_CANCELLED } = order_status
const { BTN_PRIMARY } = buttons_ui
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
    required: false,
  },
  isDarkMode: Boolean,
})
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})
const loading = ref(false)
const status = ref(props.entity.status)

const submit = async () => {
  console.log('submit', props.entity, status.value);
  const payload = {
    id: props.entity.id,
    status: status.value,
  }
  loading.value = true
  const { data, status: responseStatus } = await useFetch('/api/order/edit', {
    method: 'PUT',
    body: payload,
    onRequestError({ request, response, options }) {
      notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
    },
    onResponseError({ request, response, options }) {
      notify(response._data.message, NOTIFICATION_ERROR)
    },
    onResponse({ request, response, options }) {
      loading.value = false
      const { status, message } = response._data
      if (status !== 204) {
        notify(message, NOTIFICATION_ERROR)
      }
    }
  })

  console.log(data, responseStatus);
  if (responseStatus.value === 'success') {
    visible.value = false
    emit('refresh')
    const msg = 'Se actualizó el estado del pedido'
    notify(msg, NOTIFICATION_SUCCESS)
  }
}

</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    :prevent-close="loading"
    is-2xl
    @update:show="(val) => visible = val" 
  >
    <template #header>
      <h4 class="text-slate-900 dark:text-slate-300 text-medium text-xl">
        Actualizar estado del pedido
      </h4>
    </template>
    <template #body>
      <h4 class="leading-[20px] mb-6">Seleccione el estado al que desea actualizar el pedido</h4>
      <div class="statuses-container pb-2">
        <div 
          v-for="item in options" :key="item.value" 
          :class="['status-item text-slate-600 dark:text-slate-200 border border-slate-400 rounded-md py-2 px-4 w-full user-select-none cursor-pointer',
            { 'selected': status === item.value },
            { 'pending': item.value === ORDER_PENDING },
            { 'sent': item.value === ORDER_SENT },
            { 'delivered': item.value === ORDER_DELIVERED },
            { 'cancelled': item.value === ORDER_CANCELLED },
          ]"
          @click="status = item.value"
        >
          <span>{{ item.label }}</span>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="flex">
        <UButton 
          class="ml-auto w-[100px]" 
          color="primary" 
          size="lg" 
          :ui="BTN_PRIMARY"
          :disabled="loading || status === props.entity.status"
          @click="submit"
        >
          <IconSpinner v-if="loading" color="#fff" class="text-center mx-auto" />
          <span v-else class="text-center mx-auto">Guardar</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>
.statuses-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  .status-item {
    &.selected {
      &.pending {
        @apply bg-slate-200 text-slate-700 border-slate-600 dark:border-slate-400 dark:bg-slate-700 dark:text-slate-300;
      }
      &.sent {
        @apply bg-blue-200 text-blue-700 border-blue-600 dark:border-blue-400 dark:bg-blue-800 dark:text-blue-300;
      }
      &.delivered {
        @apply bg-emerald-200 text-emerald-700 border-emerald-600 dark:border-emerald-400 dark:bg-emerald-800 dark:text-emerald-300;
      }
      &.cancelled {
        @apply bg-red-200 text-red-700 border-red-600 dark:border-red-500 dark:bg-red-800 dark:text-red-300;
      }
    }
  }
}
</style>
