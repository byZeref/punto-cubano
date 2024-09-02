<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'
import IconWhatsapp from '~/components/icons/IconWhatsapp.vue'

const { PRICE_REGEX, EMAIL_REGEX } = regex
const { ERR_INTERNET_CONNECTION } = errorMessages
const { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } = notificationTypes
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
  await form.value.validate()
    .then(() => selectedTab.value = 1)
    .catch(() => selectedTab.value = 0)

}

const submit = async () => {
  console.log('submit', state)
  const payload = {
    username: state.fullName,
    phone: state.phone,
    email: state.email,
    products: products.value.map(({ id, quantity }) => {
      return { id, quantity }
    }),
  }
  // TODO save order in bd and send it to operator via whatsapp (server)
  loading.value = true
  const { data, status } = await useFetch('/api/order/create', {
    method: 'POST',
    body: payload,
    onRequestError({ request, response, options }) {
      notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
    },
    onResponseError({ request, response, options }) {
      notify(response._data.message, NOTIFICATION_ERROR)
    },
  }).finally(() => loading.value = false)

  console.log(data, status)
  if (status.value === 'success') {
    visible.value = false
    notify('Su pedido ha sigo enviado correctamente', NOTIFICATION_SUCCESS)
    // TODO go to whatsapp
    
  }
  
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
                variant="soft"
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
                    :disabled="loading"
                  >
                    <span class="text-center mx-auto">Siguiente</span>
                  </UButton>
                </div>
              </UForm>
            </template>

            <template v-else>
              <div class="h-full flex flex-col grow">
                <h6 class="text-slate-700 dark:text-slate-200 mb-2 leading-5">
                  Su pedido cuenta con los siguientes productos:
                </h6>

                <ul class="flex flex-col gap-3 mb-3">
                  <li v-for="prod in products" :key="prod.id">
                    <p class="font-semibold text-blue-500">{{ prod.name }}</p>
                    <p class="text-sm">Cantidad: {{ prod.quantity }}</p>
                    <p class="text-sm">Subtotal: ${{ prod.subtotal.toFixed(2) }}</p>
                  </li>
                </ul>

                <UAlert
                  icon="i-heroicons-banknotes"
                  color="blue"
                  variant="outline"
                  title="Total a pagar"
                  class="mb-5 mt-auto"
                >
                  <template #description>
                    <span class="text-lg font-bold">${{ cartStore.total.toFixed(2) }}</span>
                  </template>
                </UAlert>

                <UAlert
                  icon="i-heroicons-information-circle"
                  color="teal"
                  variant="soft"
                  title="Atención!"
                  description="Se enviará su pedido y se le comunicará con el operador vía WhatsApp."
                  class="mb-5 mt-auto"
                />

                <UDivider />

                <div class="flex gap-2 mt-5 flex-wrap justify-end">
                  <UButton
                    @click="visible = false"
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
                    class="min-w-[230px] flex justify-center items-center"
                    :disabled="loading"
                  >
                    <IconSpinner v-if="loading" size="24" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
                    <div v-else class="flex items-center justify-center gap-1">
                      <IconWhatsapp :color="isDarkMode ? 'black' : '#fff'" />
                      <span class="text-center">Enviar y contactar operador</span>
                    </div>
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
