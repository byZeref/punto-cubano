<script setup>
import { PRODUCT_CATEGORIES } from '~/utils/constants'

const emit = defineEmits(['update:show', 'refresh'])
const props = defineProps({
  show: {
    type: Boolean,
    required: true,
  },
  entity: {
    type: Object,
    required: false,
  }
})
const modalUI = { width: 'w-full sm:max-w-2xl' }
const visible = ref(props.show)
watchEffect(() => {
  if (!visible.value) emit('update:show', false)
})

const state = reactive({
  name: props.entity?.name ?? '',
  description: props.entity?.description ?? '',
  image: props.entity?.image ?? null,
  price: props.entity?.price ?? '',
  category: props.entity?.category ?? '',
  available: props.entity?.available ?? true,
})

const imagePreview = ref('')
const handleFileChange = (fileList) => {
  state.image =fileList[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(state.image)
}

const validate = (state) => {
  const errors = []
  // if (!state.name) errors.push({ path: 'name', message: 'Este campo no puede estar vacío' })
  // if (!state.description) errors.push({ path: 'description', message: 'Este campo no puede estar vacío' })
  return errors
}

async function onError (event) {
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
  state.image && formData.append('image', state.image)
  props.entity && formData.append('id', props.entity.id)

  let res
  if (props.entity) {
    res = await editProduct(formData)
  } else {
    res = await createProduct(formData)
  }
  const { data, status } = res
  console.log(status, data)

  const success = (!props.entity && status === 201) || (props.entity && status === 204)
  if (success) {
    visible.value = false
    emit('refresh')
  }
}

const createProduct = async (formData) => {
  const { data, status } = await $fetch('/api/product/create', {
    method: 'post',
    body: formData
  })
  return { data, status }
}
const editProduct = async (formData) => {
  const { data, status } = await $fetch('/api/product/edit', {
    method: 'put',
    body: formData
  })
  return { data, status }
}
</script>

<template>
  <BaseDialog v-if="visible" :show="visible" @update:show="(val) => visible = val" :ui="modalUI">
    <template #header>
      <h4 class="text-slate-900 dark:text-slate-300 font-medium text-xl">
        {{ entity ? 'Editar producto' : 'Nuevo producto' }}
      </h4>
    </template>
    <template #body>
      <UForm :validate="validate" :state="state" class="space-y-2" @submit="submit" @error="onError">
        <UFormGroup label="Nombre" name="name">
          <UInput
            v-model="state.name"
            size="lg"
            :color="entity ? 'sky' : 'emerald'" 
          />
        </UFormGroup>

        <UFormGroup label="Descripción" name="description">
          <UTextarea
          v-model="state.description"
          size="lg"
          :color="entity ? 'sky' : 'emerald'"
          :rows="1" 
          :maxrows="3" 
          autoresize
          resize
          />
        </UFormGroup>
        
        <UFormGroup label="Imagen" name="image">
          <UInput
            type="file"
            accept="image/*"
            size="lg"
            icon="i-heroicons-folder"
            :color="entity ? 'sky' : 'emerald'"
            @change="handleFileChange"
          />
          <img
            v-if="imagePreview"
            :src="imagePreview"
            class="w-full h-auto sm:w-64 sm:h-64 rounded-md mt-2" alt="product image" 
          >
        </UFormGroup>

        <div class="flex justify-between items-center gap-2">
          <UFormGroup label="Precio" name="price" class="w-full">
            <UInput
              v-model="state.price"
              size="lg"
              :color="entity ? 'sky' : 'emerald'"
            />
          </UFormGroup>
          <UFormGroup label="Categoría" name="category" class="w-full">
            <USelect
              v-model="state.category"
              size="lg"
              :color="entity ? 'sky' : 'emerald'"
              :options="PRODUCT_CATEGORIES"
            />
          </UFormGroup>
        </div>

        <div class="flex items-end">
          <UFormGroup label="Disponible" name="available">
            <UToggle v-model="state.available" size="lg" :color="entity ? 'sky' : 'emerald'" />
          </UFormGroup>
          <span 
            class="mb-[5px] text-sm text-slate-500 -ml-3 cursor-pointer user-select-none"
            @click="state.available = !state.available"
          >
            Indique si el producto está disponible
          </span>
        </div>

      </UForm>
    </template>
    <template #footer>
      <div class="flex gap-2">
        <UButton class="ml-auto" :color="entity ? 'sky' : 'emerald'" variant="outline" size="lg" @click="visible = false">
          <span class="text-center">Cancelar</span>
        </UButton>
        <UButton @click="submit" :color="entity ? 'sky' : 'emerald'" size="lg">
          <span class="text-center">Guardar</span>
        </UButton>
      </div>
    </template>
  </BaseDialog>
</template>

<style scoped>

</style>
