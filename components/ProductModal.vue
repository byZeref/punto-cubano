<script setup>
import IconSpinner from '~/components/icons/IconSpinner.vue'

const { PRICE_REGEX } = regex
const { ERR_INTERNET_CONNECTION } = errorMessages
const { NOTIFICATION_ERROR, NOTIFICATION_SUCCESS } = notificationTypes
const emit = defineEmits(['update:show', 'refresh'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  entity: {
    type: Object,
    required: false,
  },
  isDarkMode: Boolean,
})
const modalUI = { width: 'w-full sm:max-w-2xl' }
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})
const loading = ref(false)
const state = reactive({
  name: props.entity?.name ?? undefined,
  description: props.entity?.description ?? undefined,
  image: props.entity?.image ?? null,
  price: props.entity?.price ?? undefined,
  category: props.entity?.category ?? undefined,
  available: props.entity?.available ?? true,
})
const color = computed(() => props.entity ? 'sky' : 'emerald')

const imagePreview = ref('')
const handleFileChange = (fileList) => {
  state.image = fileList[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(state.image)
}

const validate = (state) => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Por favor, introduzca el nombre del producto' })
  if (!state.description) errors.push({ path: 'description', message: 'Por favor, introduzca una descripción del producto' })
  if (state.price && !PRICE_REGEX.test(state.price)) errors.push({ path: 'price', message: 'El precio debe ser un número válido' })
  if (!state.price) errors.push({ path: 'price', message: ' Por favor, introduzca el precio del producto' })
  if (!state.category) errors.push({ path: 'category', message: 'Por favor, seleccione una categoría' })

  return errors
}

const onError = async (event) => {
  const element = document.getElementById(event.errors[0].id)
  element?.focus()
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
}

const submit = async () => {
  const formData = new FormData()
  formData.append('name', state.name)
  formData.append('description', state.description)
  formData.append('price', state.price)
  formData.append('category', state.category)
  formData.append('available', state.available)

  const imageIsFile = state.image instanceof File
  imageIsFile && formData.append('image', state.image)

  let res
  loading.value = true
  if (props.entity) { // <--- edit product
    formData.append('id', props.entity.id)
    if (imageIsFile) formData.append('oldImageName', props.entity.image)
    res = await editProduct(formData)
      .finally(() => { loading.value = false })
  } else { // <--- create product
    res = await createProduct(formData)
      .finally(() => { loading.value = false })
  }
  const { data, status } = res
  console.log(status, data)

  const success = status.value === 'success'
  console.log('success', success)
  if (success) {
    visible.value = false
    emit('refresh')
    const msg = props.entity ? 'Producto actualizado exitosamente' : 'Producto creado exitosamente'
    notify(msg, NOTIFICATION_SUCCESS)
  }
}

const createProduct = async (formData) => {
  const { data, status } = await useFetch('/api/product/create', {
    method: 'POST',
    body: formData,
    onRequestError({ request, response, options }) {
      notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
    },
    onResponseError({ request, response, options }) {
      notify(response._data.message, NOTIFICATION_ERROR)
    },
    onResponse({ request, response, options }) {
      const { status, message } = response._data
      if (status !== 201) {
        notify(message, NOTIFICATION_ERROR)
      }
    }
  })
  return { data, status }
}
const editProduct = async (formData) => {
  const { data, status } = await useFetch('/api/product/edit', {
    method: 'PUT',
    body: formData,
    onRequestError({ request, response, options }) {
      notify(ERR_INTERNET_CONNECTION, NOTIFICATION_ERROR)
    },
    onResponseError({ request, response, options }) {
      notify(response._data.message, NOTIFICATION_ERROR)
    },
    onResponse({ request, response, options }) {
      const { status, message } = response._data
      if (status !== 204) {
        notify(message, NOTIFICATION_ERROR)
      }
    }
  })
  return { data, status }
}

onMounted(() => {
  if (props.entity) {
    imagePreview.value = props.entity.imageUrl
  }
})
</script>

<template>
  <BaseDialog
    v-if="visible"
    :show="visible"
    :prevent-close="loading"
    :footer="false"
    @update:show="(val) => visible = val" :ui="modalUI"
  >
    <template #header>
      <h4 class="text-slate-900 dark:text-slate-300 font-medium text-xl">
        {{ entity ? 'Editar producto' : 'Nuevo producto' }}
      </h4>
    </template>
    <template #body>
      <UForm :validate="validate" :state="state" class="space-y-5" @submit="submit" @error="onError">
        <UFormGroup name="name" class="relative">
          <template #label>
            <span>Nombre<span class="text-red-600 dark:text-red-400">*</span></span>
          </template>
          <template #default="{ error }">
            <UInput
              v-model="state.name"
              size="lg"
              :color="color"
              :disabled="loading"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
            />
          </template>
          <template #error="{ error }">
            <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
          </template>
        </UFormGroup>

        <UFormGroup name="description" class="relative">
          <template #label>
            <span>Descripción<span class="text-red-600 dark:text-red-400">*</span></span>
          </template>
          <template #default="{ error }">
            <UTextarea
              v-model="state.description"
              size="lg"
              :color="color"
              :rows="1" 
              :maxrows="3" 
              autoresize
              resize
              :disabled="loading"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
            />
          </template>
          <template #error="{ error }">
            <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
          </template>
        </UFormGroup>

        <UFormGroup name="price" class="relative">
          <template #label>
            <span>Precio<span class="text-red-600 dark:text-red-400">*</span></span>
          </template>
          <template #default="{ error }">
            <UInput
              v-model="state.price"
              size="lg"
              :color="color"
              :disabled="loading"
              :trailing-icon="error ? 'i-heroicons-exclamation-triangle' : undefined"
            />
          </template>
          <template #error="{ error }">
            <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
          </template>
        </UFormGroup>
        
        <UFormGroup name="category" class="relative">
          <template #label>
            <span>Categoría<span class="text-red-600 dark:text-red-400">*</span></span>
          </template>
          <USelectMenu
            v-model="state.category"
            size="lg"
            :color="color"
            :options="PRODUCT_CATEGORIES"
            :disabled="loading"
          />
          <template #error="{ error }">
            <span class="absolute -bottom-[18px] text-xs">{{ error }}</span>
          </template>
        </UFormGroup>

        <UFormGroup name="image">
          <template #label>
            <span>Imagen</span>
          </template>
          <UInput
            type="file"
            accept="imag dark:text-red-400e/*"
            size="lg"
            icon="i-heroicons-folder"
            :color="color"
            @change="handleFileChange"
            :disabled="loading"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            class="w-full h-auto sm:w-64 sm:h-64 rounded-md mt-2" alt="product image" 
          >
        </UFormGroup>

        <div class="flex items-end">
          <UFormGroup name="available">
            <template #label>
              <span>Disponible</span>
            </template>
            <UToggle
              v-model="state.available"
              size="lg"
              :color="color" 
              :disabled="loading"
            />
          </UFormGroup>
          <span 
            class="mb-[6px] text-sm text-slate-500 dark:text-slate-400 -ml-3 cursor-pointer user-select-none"
            @click="() => {
              if (!loading) state.available = !state.available
            }"
          >
            Indique si el producto está disponible
          </span>
        </div>

        <UDivider class="" />
        <div class="flex gap-2">
          <UButton
            class="ml-auto"
            :color="color" 
            variant="outline" 
            size="lg" 
            @click="visible = false"
            :disabled="loading"
          >
            <span class="text-center">Cancelar</span>
          </UButton>
          <UButton
            type="submit"
            :color="color" 
            size="lg"
            class="min-w-[90px] flex"
            :disabled="loading"
            >
            <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
            <span v-else class="text-center mx-auto">Guardar</span>
          </UButton>
        </div>

      </UForm>
    </template>
    <!-- <template #footer>
      <div class="flex gap-2">
        <UButton
          class="ml-auto"
          :color="color" 
          variant="outline" 
          size="lg" 
          @click="visible = false"
          :disabled="loading"
        >
          <span class="text-center">Cancelar</span>
        </UButton>
        <UButton
          @click="submit"
          :color="color" 
          size="lg"
          class="min-w-[90px] flex"
          :disabled="loading"
          >
          <IconSpinner v-if="loading" :color="isDarkMode ? 'black' : '#fff'" class="text-center mx-auto" />
          <span v-else class="text-center mx-auto">Guardar</span>
        </UButton>
      </div>
    </template> -->
  </BaseDialog>
</template>

<style scoped>

</style>
