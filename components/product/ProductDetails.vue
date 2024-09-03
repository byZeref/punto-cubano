<script setup>
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  entity: {
    type: Object,
    required: true,
  },
  isDarkMode: Boolean,
})
const { BTN_PRIMARY } = buttons_ui
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})
const cartStore = useCartStore()
const quantity = ref(1)
const amount = computed(() => (quantity.value * props.entity.price).toFixed(2))

const handleAddToCart = () => {
  cartStore.add(props.entity, quantity.value)
  visible.value = false
}

</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    :header="false"
    :footer="false"
    is-2xl
    @update:show="(val) => visible = val"
  >
    <template #body>
      <div class="image-container">
        <span 
          @click="visible = false"
          class="absolute top-3 right-3 z-10 flex items-center justify-center w-8 h-8 rounded-full bg-[#00000070] text-white cursor-pointer"
        >
          <UIcon name="i-heroicons-x-mark" class="w-5 h-5" />
        </span>
        <img
          :src="entity.imageUrl"
          class="w-auto sm:w-full h-full sm:h-auto max-h-[400px] object-cover user-select-none"
          alt="product image"
        >
      </div>
      <div class="description mt-4 text-slate-900 dark:text-slate-100">
        <div class="flex items-center gap-2">
          <h6 class="text-xl text-semibold">{{ entity.name }}</h6>
          <AvailabilityBadge :available="entity.available" />
        </div>
        <p class="text-sm my-1 sm:my-2 leading-4">{{ entity.description }}</p>
        <p class="text-semibold">${{ entity.price.toFixed(2) }}</p>
      </div>
      <div class="actions flex justify-between sm:justify-end gap-4 my-4">
        <UButtonGroup size="xl" orientation="horizontal">
          <UButton
            :ui="{color: {white:{ soft: quantity > 1 ? 'shadow-lg' : ''}}}"
            :disabled="quantity === 1 || !entity.available"
            icon="i-heroicons-minus"
            color="white"
            variant="soft"
            :class="[quantity > 1 ? 'text-red-500 dark:text-red-400' : 'text-black dark:text-white']"
            @click="quantity--"
          />
          <UButton
            :disabled="!entity.available"
            color="white"
            variant="soft"
            class="px-7 text-slate-900 dark:text-slate-100 text-medium"
          >
            {{ quantity }}
          </UButton>
          <UButton
            :disabled="!entity.available"
            :ui="{color: {white:{ soft: 'shadow-lg'}}}"
            icon="i-heroicons-plus"
            color="white"
            variant="soft"
            class="text-[#4c1b1e] dark:text-[#7f2c30]"
            @click="quantity++"
          />
        </UButtonGroup>
        <UButton
          :disabled="!entity.available"
          :ui="BTN_PRIMARY"
          size="xl"
          color="primary"
          class="flex justify-center items-center grow"
          variant="solid"
          :label="`Agregar por $${amount}`"
          @click="handleAddToCart"
        >
          <span class="text-semibold">{{ `Agregar por $${amount}` }}</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
