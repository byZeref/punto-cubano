<script setup>
defineProps({
  updateInputFilter: Function
})

const filters = inject('filters')
const STATUS_OPTIONS = [{value: 'all', label: 'Todos'}, ...order_status_options]

</script>

<template>
  <div class="flex flex-col md:flex-row md:items-center gap-2">
    <UFormGroup class="w-full">
      <template #label>
        <span class="text-medium">Estado del producto</span>
      </template>
      <USelectMenu
        v-model="filters.status"
        :options="STATUS_OPTIONS"
        value-attribute="value"
        option-attribute="label"
        placeholder="Estado del pedido"
        size="md"
        color="sky"
        :ui="{ size: 'text-md' }"
      />
    </UFormGroup>
    <UFormGroup class="w-full">
      <template #label>
        <span class="text-medium">Nombre y apellidos</span>
      </template>
      <UInput
        placeholder="Nombre"
        color="sky"
        size="md"
        :ui="{ size: 'text-md' }"
        @input="(e) => updateInputFilter('name', e)"
      />
    </UFormGroup>
    <UFormGroup class="w-full">
      <template #label>
        <span class="text-medium">Email</span>
      </template>
      <UInput
        placeholder="Email"
        color="sky"
        size="md"
        :ui="{ size: 'text-md' }"
        @input="(e) => updateInputFilter('email', e)"
      />
    </UFormGroup>
    <UFormGroup class="w-full">
      <template #label>
        <span class="text-medium">Teléfono</span>
      </template>
      <UInput
        placeholder="Teléfono"
        color="sky"
        size="md"
        :ui="{ size: 'text-md' }"
        @input="(e) => updateInputFilter('phone', e)"
      />
    </UFormGroup>
  </div>
</template>

<style scoped>

</style>
