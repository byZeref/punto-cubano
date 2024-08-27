<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'

const { PRICE_REGEX, EMAIL_REGEX } = regex
const cartStore = useCartStore()
const products = computed(() => cartStore.products)
const selectedTab = ref(0)
const tabs = [
  { label: 'Datos de contacto', key: 'form' },
  { label: 'Pedido', key: 'order' },
]
const emit = defineEmits(['update:show'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  isDarkMode: Boolean,
})
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})
const loading = ref(false)
const form = ref()
const state = reactive({
  fullName: undefined,
  phone: undefined,
  email: undefined,
})
const validate = (state) => {
  const errors = []
  if (!state.fullName) errors.push({ path: 'fullName', message: 'Por favor, introduzca su nombre' })
  if (state.phone && !PRICE_REGEX.test(state.phone)) errors.push({ path: 'phone', message: 'El teléfono no puede contener letras' })
  if (!state.phone) errors.push({ path: 'phone', message: 'Por favor, introduzca su número de teléfono' })
  if (state.email && !EMAIL_REGEX.test(state.email)) errors.push({ path: 'email', message: 'Por favor, introduzca un correo electrónico válido' })
  if (!state.email) errors.push({ path: 'email', message: 'Por favor, introduzca su correo electrónico' })

  return errors
}
const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}
const handleFormValidation = async () => {
  const v = await form.value.validate()
    .then(() => selectedTab.value = 1)
    .catch(() => selectedTab.value = 0)

}

const submit = async () => {
  console.log('submit')
  console.log(state)
}

</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    :prevent-close="loading"
    :footer="false"
    is-2xl
    @update:show="(val) => visible = val" 
  >
    <template #header>
      <h4 class="text-slate-900 dark:text-slate-300 font-medium text-xl">
        Confirmación de pedido
      </h4>
    </template>
    <template #body>
      <UTabs v-model="selectedTab" :items="tabs">
        <template #item="{ item }">
          <div class="min-h-[495px] sm:min-h-[475px] h-full p-4 border border-1 rounded-md flex flex-col" :ui="{ body: { padding: 'px-4 py-4 sm:p-6' } }">
            <template  v-if="item.key === 'form'">
              <h6 class="text-slate-700 dark:text-slate-200 mb-2 leading-5">
                Introduzca los siguientes datos:
              </h6>
  
              <UAlert
                icon="i-heroicons-information-circle"
                color="teal"
                variant="outline"
                title="Importante!"
                description="Esta información solo se usará para contactar con usted y mantenerlo al tanto del estado en el que se encuentra su pedido."
                class="mb-2"
              />
  
              <UForm
                ref="form"
                :validate="validate"
                :state="state"
                @submit="submit"
                @error="onError"
                class="space-y-5 grow"
              >
                <UFormGroup name="fullName" class="relative">
                  <template #label>
                    <span>Nombre y apellidos<span class="text-red-600 dark:text-red-400">*</span></span>
                  </template>
                  <template #default="{ error }">
                    <UInput
                      v-model="state.fullName"
                      size="lg"
                      :ui="{ size: { lg: 'text-md' } }"
                      color="teal"
                      :disabled="loading"
                      :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
                    />
                  </template>
                  <template #error="{ error }">
                    <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
                  </template>
                </UFormGroup>
  
                <UFormGroup name="phone" class="relative">
                  <template #label>
                    <span>Teléfono<span class="text-red-600 dark:text-red-400">*</span></span>
                  </template>
                  <template #default="{ error }">
                    <UInput
                      v-model="state.phone"
                      size="lg"
                      :ui="{ size: { lg: 'text-md' } }"
                      color="teal"
                      :disabled="loading"
                      :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
                    />
                  </template>
                  <template #error="{ error }">
                    <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
                  </template>
                </UFormGroup>
  
                <UFormGroup name="email" class="relative">
                  <template #label>
                    <span>Correo electrónico<span class="text-red-600 dark:text-red-400">*</span></span>
                  </template>
                  <template #default="{ error }">
                    <UInput
                      v-model="state.email"
                      size="lg"
                      :ui="{ size: { lg: 'text-md' } }"
                      color="teal"
                      :disabled="loading"
                      :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
                    />
                  </template>
                  <template #error="{ error }">
                    <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
                  </template>
                </UFormGroup>
  
                <UDivider class="mt-auto" />

                <div class="flex gap-2 mt-5">
                  <UButton
                    @click="visible = false"
                    class="ml-auto"
                    color="teal" 
                    variant="outline" 
                    size="lg" 
                    :disabled="loading"
                  >
                    <span class="text-center">Cancelar</span>
                  </UButton>
                  <UButton
                    @click="handleFormValidation"
                    color="teal" 
                    size="lg"
                    class="min-w-[90px] flex"
                    :disabled="loading"
                  >
                    <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
                    <span v-else class="text-center mx-auto">Siguiente</span>
                  </UButton>
                </div>
              </UForm>
            </template>

            <template v-else>
              <div class="h-full flex flex-col grow">
                <h6 class="text-slate-700 dark:text-slate-200 mb-2 leading-5">
                  Su pedido cuenta con los siguientes productos:
                </h6>

                <ul class="flex flex-col gap-3 mb-6">
                  <li v-for="prod in products" :key="prod.id">
                    <p class="font-semibold">{{ prod.name }}</p>
                    <p class="text-sm">Cantidad: {{ prod.quantity }}</p>
                    <p class="text-sm">Subtotal: ${{ prod.subtotal.toFixed(2) }}</p>
                  </li>
                </ul>

                <div class="flex flex-col items-end mb-3">
                  <p>Total a pagar</p>
                  <p class="text-xl font-bold">${{ cartStore.total.toFixed(2) }}</p>
                </div>

                <UDivider class="mt-auto" />

                <div class="flex gap-2 mt-5">
                  <UButton
                    @click="visible = false"
                    class="ml-auto"
                    color="teal" 
                    variant="outline" 
                    size="lg" 
                    :disabled="loading"
                  >
                    <span class="text-center">Cancelar</span>
                  </UButton>
                  <UButton
                    @click="submit"
                    color="teal" 
                    size="lg"
                    class="min-w-[90px] flex"
                    :disabled="loading"
                  >
                    <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
                    <span v-else class="text-center mx-auto">Confirmar ahora</span>
                  </UButton>
                </div>
              </div>
            </template>
          </div>
        </template>
      </UTabs>

      

    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
