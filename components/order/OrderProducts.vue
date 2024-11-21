<script setup>
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
const totalAmount = ref(0)

const { data: products } = await useFetch(`/api/order/${props.entity.id}`, {
  method: 'GET',
  onResponse({ response }) {
    response._data.forEach(prod => {
      totalAmount.value += prod.quantity * prod.products.price
    })
  }
})
console.log('order products', products);


</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    :prevent-close="loading"
    :footer="false"
    is-2xl
    @update:show="(val) => visible = val" 
  >
    <template #header>
      <h4 class="text-slate-900 dark:text-slate-300 text-medium text-xl">
        Productos del pedido {{ entity.id }}
      </h4>
    </template>
    <template #body>
      <div class="products-container flex flex-col gap-2">
        <div 
          v-for="(prod) in products" :key="prod.product" 
          class="product border border-slate-400 rounded-md py-2 px-4 flex justify-between items-center"
        >
          <div>
            <h4 class="text-semibold">{{ prod.products.name }}</h4>
            <p class="text-sm">Cantidad: {{ prod.quantity }}</p>
            <p class="text-sm">Precio: ${{ prod.products.price.toFixed(2) }}</p>
            <p class="text-sm text-medium">Subtotal: ${{ (prod.quantity * prod.products.price).toFixed(2) }}</p>
          </div>
          <div class=" h-[90px] w-[90px] mr-[-8px] rounded-md overflow-hidden">
            <img 
              class="h-full w-full object-cover" 
              :src="prod.products.imageUrl"
              :alt="`Product ${prod.product} image`"
            >
          </div>
        </div>

        

        <div class="mt-4">
          <p class="text-medium">Impote total</p>
          <div class="w-full h-[1px] mb-2 bg-slate-300"></div>
          <p class="text-[36px] leading-[40px] text-medium">${{ totalAmount.toFixed(2) }}</p>
        </div>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
