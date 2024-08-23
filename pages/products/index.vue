<script setup>
import ProductModal from '~/components/product/ProductModal.vue'
import ProductCard from '~/components/product/ProductCard.vue'

const { ERR_INTERNET_CONNECTION } = errorMessages
const { NOTIFICATION_ERROR } = notificationTypes
const { BTN_PRIMARY } = buttons_ui

const { data: products, error, refresh } = await useFetch('/api/product/all', {
  onRequestError({ request, response, options }) {
    notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
  },
  onResponseError({ request, response, options }) {
    notify(response._data.message, NOTIFICATION_ERROR)
  },
})
console.log('products', products)
console.log('error', error)

const isDarkMode = useCookie('dark')
const router = useRouter()
const cartStore = useCartStore()
const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLogged)
const hasAnOrder = computed(() => cartStore.count > 0)

const showProductModal = ref(false)
const handleNewProduct = () => {
  showProductModal.value = true
}

const handleGoToCart = () => {
  router.push('/cart')
}

</script>

<template>
  <ProductModal
    v-if="showProductModal"
    :show="showProductModal"
    :is-dark-mode="isDarkMode"
    @update:show="(val) => showProductModal = val"
    @refresh="refresh"
  />

  <section class="relative">
    <div class="flex flex-wrap gap-1 justify-between items-center">
      <PageHeader title="Listado de productos" />
      <UButton
        v-if="isLogged"
        @click="handleNewProduct"
        :ui="BTN_PRIMARY"
        icon="i-heroicons-plus"
        size="md"
        color="primary"
        class="mb-5"
        variant="solid"
        label="Nuevo"
      />
    </div>

    <div v-if="products?.length" class="products-container">
      <ProductCard
        v-for="(product) in products" 
        :key="product.id" 
        :product="product" 
        :is-dark-mode="isDarkMode" 
        :is-logged="isLogged"
        @refresh="refresh"
      />
    </div>
    <UAlert
      v-else
      icon="i-heroicons-exclamation-triangle"
      color="red"
      variant="soft"
      title="Ups!"
      description="No se han encontrado productos. Agregue uno nuevo para verlo aquí."
      :actions="[{ color: 'red', variant: 'outline', label: 'Agregar un nuevo producto', click: () => handleNewProduct() }]"
    />

    <FixedBottom
      v-if="hasAnOrder"
      label="Ver mi pedido"
      :action="handleGoToCart"
      :total-products="cartStore.count"
      :total-amount="cartStore.total"
    />
  </section>
</template>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}
</style>
