<script setup>
const toast = useToast()
const { data: products, error, refresh } = await useFetch('/api/product/all', {
  onRequestError({ request, response, options }) {
    notify('Por favor verifique su conexión a internet', 'error')
  },
  onResponseError({ request, response, options }) {
    notify(response._data.message, 'error')
  },
})
console.log('products', products)
console.log('error', error)

const isDarkMode = useCookie('dark')
const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLogged)
const btnUI = {
  color: {
    primary: {
      solid: `shadow-sm text-white dark:text-white bg-[#4c1b1e] hover:bg-[#4c1b1ef0] disabled:bg-[#4c1b1e] 
      dark:bg-[#4c1b1e] dark:hover:bg-[#4c1b1ed0] dark:disabled:bg-[#4c1b1e]`,
    },
  }
}

const showProductModal = ref(false)
const handleNewProduct = () => {
  showProductModal.value = true
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

  <section>
    <div class="flex flex-wrap gap-1 justify-between items-center">
      <PageHeader title="Listado de productos" />
      <UButton
        @click="handleNewProduct"
        :ui="btnUI"
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
  </section>
</template>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}
</style>
