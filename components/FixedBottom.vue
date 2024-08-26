<script setup>
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  action: {
    type: Function,
    required: true,
  },
  totalProducts: {
    type: Number,
    required: false,
  },
  totalAmount: {
    type: Number,
    required: false,
  }
})
const { BTN_PRIMARY } = buttons_ui
const hasOrderInfo = computed(() => props.totalAmount && props.totalProducts)

</script>

<template>
  <div class="fixed-bottom fixed bottom-0 left-0 right-0 p-4 bg-white dark:bg-gray-800 w-full">
    <div class="flex justify-between items-center gap-2 max-w-6xl mx-auto lg:px-10">
      <div v-if="hasOrderInfo" class="w-[100px]">
        <p class="text-sm text-slate-500 dark:text-slate-300">{{ totalProducts }} productos</p>
        <p class="font-semibold text-lg">${{ totalAmount.toFixed(2) }}</p>
      </div>
      <UButton
        :ui="BTN_PRIMARY"
        size="xl"
        :color="hasOrderInfo ? 'primary' : 'teal'"
        variant="solid"
        class="py-3 font-semibold flex justify-center items-center grow"
        @click="action"
      >
        <UIcon v-if="!hasOrderInfo" name="i-heroicons-check-badge" class="w-6 h-6" />
        <span :class="{'text-white': hasOrderInfo}">{{ label }}</span>
      </UButton>
    </div>
  </div>
</template>

<style scoped>
.fixed-bottom {
  box-shadow: 0 0 12px 6px rgba(0, 0, 0, 0.1);
}
</style>
