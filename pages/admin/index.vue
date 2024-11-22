<script setup>
const { ERR_INTERNET_CONNECTION } = errorMessages
const { NOTIFICATION_ERROR } = notificationTypes
const { ORDER_PENDING, ORDER_SENT, ORDER_DELIVERED, ORDER_CANCELLED } = order_status
const isDarkMode = useCookie('dark')
const columns = [
  { key: 'actions', label: 'Acciones', sortable: false, },
  { key: 'status', label: 'Estado', sortable: true, },
  { key: 'created_at', label: 'Fecha y hora', sortable: true, },
  { key: 'username', label: 'Nombre y apellidos', sortable: true, },
  { key: 'email', label: 'Correo electrónico', sortable: true, },
  { key: 'phone', label: 'Teléfono', sortable: true, },
]
const sort = ref({
  column: 'created_at',
  direction: 'desc'
})

const { data: orders, error, status, refresh } = await useFetch('/api/order/all', {
  onRequestError({ request, response, options }) {
    notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
  },
  onResponseError({ request, response, options }) {
    notify(response._data.message, NOTIFICATION_ERROR)
  },
})
console.log('orders', orders)
console.log('error', error)

const target = ref()
const showOrderProducts = ref(false)
const loadingModal = ref(false)
const handleShowOrderProducts = (order) => {
  console.log('show order products', order);
  target.value = order
  showOrderProducts.value = true
  loadingModal.value = true
}

const showOrderStatus = ref(false)
const handleUpdateOrderStatus = (order) => {
  console.log('update order status', order);
  target.value = order
  showOrderStatus.value = true
  loadingModal.value = true
}

</script>

<template>
  <Loading v-if="loadingModal" />
  <OrderProducts
    v-if="showOrderProducts"
    :show="showOrderProducts"
    :is-dark-mode="isDarkMode"
    :entity="target"
    @mounted="loadingModal = false"
    @update:show="(val) => {
      showOrderProducts = val
      if (!val) target = undefined
    }"
    @refresh="refresh"
  />
  <OrderStatus
    v-if="showOrderStatus"
    :show="showOrderStatus"
    :is-dark-mode="isDarkMode"
    :entity="target"
    @update:show="(val) => {
      showOrderStatus = val
      if (!val) target = undefined
    }"
    @refresh="refresh"
  />

  <section>
    <PageHeader title="Listado de pedidos" />

    <UCard>
      <template #header>
        Filtros
      </template>

      <UTable :columns="columns" :rows="orders" :sort="sort" :loading="status === 'pending'" >
        <!-- Header row -->
        <template #actions-header="{ column }">
          <span class="text-medium text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
        <template #created_at-header="{ column }">
          <span class="text-medium text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
        <template #username-header="{ column }">
          <span class="text-medium text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
        <template #email-header="{ column }">
          <span class="text-medium text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
        <template #phone-header="{ column }">
          <span class="text-medium text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
        <template #status-header="{ column }">
          <span class="text-medium text-center text-[#7f2c30] dark:text-white">{{ column.label }}</span>
        </template>
  
        <!-- Data rows -->
        <template #actions-data="{ row }">
          <div class="flex gap-1">
            <UTooltip text="Ver productos del pedido" :popper="{ placement: 'top' }">
              <UButton
                @click="handleShowOrderProducts(row)"
                icon="i-heroicons-eye"
                color="cyan"
                variant="solid"
              />
            </UTooltip>
            <UTooltip text="Actualizar estado del pedido" :popper="{ placement: 'top' }">
              <UButton
                @click="handleUpdateOrderStatus(row)"
                icon="i-heroicons-arrow-trending-up"
                color="indigo"
                variant="solid"
              />
            </UTooltip>
          </div>
        </template>
        <template #created_at-data="{ row }">
          <span>{{ formatDate(row.created_at) }}</span>
        </template>
        <template #status-data="{ row }">
          <span :class="['text-semibold text-xs px-2 py-1 rounded-md', 
            { 'pending': row.status === ORDER_PENDING },
            { 'sent': row.status === ORDER_SENT },
            { 'delivered': row.status === ORDER_DELIVERED },
            { 'cancelled': row.status === ORDER_CANCELLED },
          ]">
            {{ order_status_labels[row.status] }}
          </span>
        </template>
      </UTable>
    </UCard>


  </section>
</template>

<style scoped>
span.pending {
  @apply bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300;
}
span.sent {
  @apply bg-blue-200 text-blue-700 dark:bg-blue-800 dark:text-blue-300;
}
span.delivered {
  @apply bg-emerald-200 text-emerald-700 dark:bg-emerald-800 dark:text-emerald-300;
}
span.cancelled {
  @apply bg-red-200 text-red-700 dark:bg-red-800 dark:text-red-300;
}
</style>
