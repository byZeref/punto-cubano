<script setup>
// TODO load all products (para esto debe estar ssr=true)
// const { data: products } = await useFetch('/api/product/all', 'get')

const isDarkMode = useCookie('dark')
const authStore = useAuthStore()
const isLogged = computed(() => authStore.isLogged)

const prods = ref([])
const loadProducts = async () => {
  const { data } = await $fetch('/api/product/all', { method: 'get'})
  console.log('data', data.products)
  prods.value = data.products
}

onMounted(() => {
  loadProducts()
})
</script>

<template>
  <section>
    <PageHeader title="Listado de productos" />

    <template v-if="prods.length">
      <div class="products-container">
        <ProductCard
          v-for="(product) in prods" 
          :key="product.id" 
          :data="product" 
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
