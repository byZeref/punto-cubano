<script setup>
import IconShoppingCartAdd from '~/components/icons/IconShoppingCartAdd.vue'

const props = defineProps({
  data: {
    type: Object,
    required: true,
  },
  isDarkMode: Boolean,
  isLogged: Boolean,
})

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
  return decimal.length > 1 ? decimal : `${decimal}0`
}

const addToCart = (id) => {
  console.log('add product to cart', id)
}
</script>

<template>
  <UCard :ui="cardUI">
    <div class="flex h-28 lg:h-32">
      <div class="h-full w-[120px] lg:w-[140px] flex-shrink-0">
        <img class="h-full w-auto object-cover" :src="data.imageUrl" alt="Product image">
      </div>
      <div class="w-full flex flex-col px-4 lg:px-4 py-1 lg:py-2 lg:gap-[2px] relative">
        <span class="font-medium text-slate-900 dark:text-white">{{ data.name }}</span>
        <UTooltip :text="data.description" :popper="{ placement: 'top' }" :ui="tooltipUI">
          <span class="text-xs line-clamp-1 cursor-help">{{ data.description }}</span>
        </UTooltip>
        <AvailabilityBadge :available="data.available" />
        <div class="mt-auto flex items-center justify-between">
          <span class="text-[var(--primary-color)] tracking-tight">
            <span class="text-base lg:text-lg">$</span>
            <span class="font-medium text-2xl lg:text-3xl tracking-tighter">{{ getPriceInteger(data.price) }}</span><span class="font-medium text-base lg:text-lg">.{{ getPriceDecimal(data.price) }}</span>
          </span>
          <div class="flex gap-1 absolute right-2 bottom-2">
            <!-- v-if="isLogged" -->
            <div
              class="flex items-center justify-center h-8 lg:h-10 w-8 lg:w-10 cursor-pointer p-1 border border-1 border-slate-600 dark:border-white rounded-full hover:bg-slate-200 dark:hover:bg-slate-800 duration-200"
              @click="addToCart(data.id)"
            >
              <IconShoppingCartAdd :color="isDarkMode ? '#fff' : 'black'" />
            </div>
            <!-- v-else -->
            <div class="flex gap-1">
              <UButton
                :ui="{ rounded: 'rounded-full' }"
                icon="i-heroicons-pencil-square"
                size="sm"
                color="sky"
                class="w-8 h-8 lg:w-10 lg:h-10 flex justify-center items-center"
                variant="solid"
              />
              <UButton
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

</style>
