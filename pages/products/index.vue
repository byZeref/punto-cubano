<script setup>
// TODO load all products (para esto debe estar ssr=true)
// const { data: products } = await useFetch('/api/product/all', 'get')

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

const prods = ref([])
const loadProducts = async () => {
  const { data } = await $fetch('/api/product/all', { method: 'get'})
  prods.value = data.products
}

const showProductModal = ref(false)
const handleNewProduct = () => {
  showProductModal.value = true
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <ProductModal
    v-if="showProductModal"
    :show="showProductModal" 
    @update:show="(val) => showProductModal = val"
    @refresh="loadProducts"
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

    <template v-if="prods.length">
      <div class="products-container">
        <ProductCard
          v-for="(product) in prods" 
          :key="product.id" 
          :product="product" 
          :is-dark-mode="isDarkMode" 
          :is-logged="isLogged"
        />
      </div>
    </template>

  </section>
</template>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 1rem;
}
</style>
