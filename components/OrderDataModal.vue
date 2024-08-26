<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'

const { PRICE_REGEX, EMAIL_REGEX } = regex
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

const submit = async () => {

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
        Datos de contacto
      </h4>
    </template>
    <template #body>
      <!-- TODO Usar tabs aqui (una con el form y la otra con los datos del pedido) -->

      <h6 class="text-slate-700 dark:text-slate-200 mb-2 leading-5">
        Introduzca los siguientes datos para que podamos contactar con usted:
      </h6>

      <UAlert
        icon="i-heroicons-information-circle"
        color="teal"
        variant="outline"
        title="Importante!"
        description="Esta información solo se usará para contactar con usted y mantenerlo al tanto del estado en el que se encuentra su pedido."
        class="mb-2"
      />

      <UForm :validate="validate" :state="state" class="space-y-5" @submit="submit" @error="onError">
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
            <span>Telefono<span class="text-red-600 dark:text-red-400">*</span></span>
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

        <UDivider class="" />
        <div class="flex gap-2">
          <UButton
            class="ml-auto"
            color="teal" 
            variant="outline" 
            size="lg" 
            @click="visible = false"
            :disabled="loading"
          >
            <span class="text-center">Cancelar</span>
          </UButton>
          <UButton
            type="submit"
            color="teal" 
            size="lg"
            class="min-w-[90px] flex"
            :disabled="loading"
            >
            <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
            <span v-else class="text-center mx-auto">Enviar</span>
          </UButton>
        </div>

      </UForm>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
