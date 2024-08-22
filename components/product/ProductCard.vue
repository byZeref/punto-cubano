<script setup>
import IconShoppingCartAdd from '~/components/icons/IconShoppingCartAdd.vue'

defineEmits(['refresh'])
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
  isDarkMode: Boolean,
  isLogged: Boolean,
})
const cartStore = useCartStore()
const showProductModal = ref(false)
const showRemoveConfirm = ref(false)
const showDetails = ref(false)
const cardUI = {
  body: {
    padding: 'p-0 sm:p-0',
  },
  rounded: 'rounded-none',
}
const tooltipUI = {
  width: 'max-w-full',
}

const getPriceInteger = (price) => {
  const str = price.toString()
  const [integer, decimal] = str.split('.')
  return integer
}
const getPriceDecimal = (price) => {
  const str = price.toString()
  const [integer, decimal] = str.split('.')
  return decimal 
    ? decimal.length > 1 ? decimal : `${decimal}0`
    : '00'
}

const handleAddProductToCart = (target) => {
  cartStore.add(target)
}
const handleEditProduct = () => {
  showProductModal.value = true
}
const handleRemoveProduct = () => {
  showRemoveConfirm.value = true
}
const handleDetailsProduct = () => {
  showDetails.value = true
}

</script>

<template>
  <ProductModal
    v-if="showProductModal"
    :show="showProductModal"
    :entity="product"
    :is-dark-mode="isDarkMode"
    @update:show="(val) => showProductModal = val"
    @refresh="$emit('refresh')"
  />
  <ProductRemove
    v-if="showRemoveConfirm"
    :show="showRemoveConfirm"
    :entity="product"
    :is-dark-mode="isDarkMode"
    @update:show="(val) => showRemoveConfirm = val"
    @refresh="$emit('refresh')"
  />
  <ProductDetails
    v-if="showDetails"
    :show="showDetails"
    :entity="product"
    :is-dark-mode="isDarkMode"
    @update:show="(val) => showDetails = val"
  />

  <UCard
    class="product-card"
    :ui="cardUI"
    @click="handleDetailsProduct"
  >
    <div class="flex h-28 lg:h-32">
      <div class="h-full w-[120px] lg:w-[140px] flex-shrink-0 overflow-hidden">
        <img
          :src="product.imageUrl" 
          class="product-image h-full w-auto object-cover duration-200"
          alt="Product image"
        >
      </div>
      <div class="w-full flex flex-col px-4 lg:px-4 py-1 lg:py-2 lg:gap-[2px] relative">
        <span class="product-name font-medium text-slate-900 dark:text-white">{{ product.name }}</span>
        <UTooltip :text="product.description" :popper="{ placement: 'top' }" :ui="tooltipUI">
          <span class="text-xs line-clamp-1">{{ product.description }}</span>
        </UTooltip>
        <AvailabilityBadge :available="product.available" />
        <div class="mt-auto flex items-center justify-between">
          <span class="text-[var(--primary-color)] tracking-tight">
            <span class="text-base lg:text-lg">$</span>
            <span class="font-medium text-2xl lg:text-3xl tracking-tighter">{{ getPriceInteger(product.price) }}</span><span class="font-medium text-base lg:text-lg">.{{ getPriceDecimal(product.price) }}</span>
          </span>
          <div class="flex gap-1 absolute right-2 bottom-2">
            <!-- TODO v-if="isLogged" -->
            <div
              class="flex items-center justify-center h-8 lg:h-10 w-8 lg:w-10 cursor-pointer p-1 border border-1 border-slate-600 dark:border-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 duration-200"
              @click.stop="cartStore.remove(product)"
            >
              -
            </div>
            <div
              class="flex items-center justify-center h-8 lg:h-10 w-8 lg:w-10 cursor-pointer p-1 border border-1 border-slate-600 dark:border-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 duration-200"
              @click.stop="handleAddProductToCart(product)"
            >
              <IconShoppingCartAdd :color="isDarkMode ? '#fff' : 'black'" />
            </div>
            <!-- TODO v-else -->
            <div class="flex gap-1">
              <UButton
                @click.stop="handleEditProduct(product)"
                :ui="{ rounded: 'rounded-full' }"
                icon="i-heroicons-pencil-square"
                size="sm"
                color="sky"
                class="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center"
                variant="solid"
              />
              <UButton
                @click.stop="handleRemoveProduct(product)"
                :ui="{ rounded: 'rounded-full' }"
                icon="i-heroicons-trash"
                size="sm"
                color="red"
                class="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center"
                variant="solid"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </UCard>
</template>

<style scoped>
.product-card {
  cursor: pointer;
  &:hover {
    .product-image {
      scale: 1.10;
    }
    .product-name {
      color: var(--primary-color);
    }
  }
}
</style>
