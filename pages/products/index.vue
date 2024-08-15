<script setup>
// TODO load all products (para esto debe estar ssr=true)
// const { data: products } = await useFetch('/api/product/all', 'get')

const prods = ref([])
const loadProducts = async () => {
  const { data } = await useFetch('/api/product/all', 'get')
  console.log('data', data.value.data.products)
  prods.value = data.value.data.products
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
        <ProductCard v-for="(product) in prods" :key="product.id" :data="product" />
      </div>
    </template>

  </section>
</template>

<style scoped>
.products-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
</style>
