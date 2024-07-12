<script setup>
// const run = await useFetch('/api/health', {
//   method: 'get'
// })

const { data } = await useFetch('/api/product/all', 'get')
console.log(data)

const form = ref({
  name: '',
  image: null
})
const imagePreview = ref('')

const handleFileChange = (e) => {
  form.value.image = e.target.files[0]
  const reader = new FileReader()
  reader.onload = (e) => {
    imagePreview.value = e.target.result
  }
  reader.readAsDataURL(form.value.image)
}

const submit = async () => {
  const formData = new FormData()
  formData.append('name', form.value.name)
  formData.append('image', form.value.image)

  const data = await $fetch('/api/product/create', {
    method: 'post',
    body: formData
  })

  // console.log(data)
}

</script>

<template>
  <div class="max-w-3xl mx-auto">
    <h1 class="text-3xl text-center mb-10">Home Page</h1>

    <form class="flex flex-col gap-4" @submit.prevent="submit">
      <input
        v-model="form.name"
        type="text" name="name" placeholder="Nombre"
        class="border-2 border-blue-400 rounded-md p-2"
      >
      <input type="file" accept="image/*" name="file" placeholder="Imagen" @change="handleFileChange">
      <img v-if="true" :src="imagePreview" class="w-64 h-64 rounded-md" alt="user-image" >

      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded-md">
        Enviar
      </button>
    </form>
  </div>
</template>

<style scoped>

</style>
