<script setup>
// const run = await useFetch('/api/health', {
//   method: 'get'
// })


const { data: users } = await useFetch('/api/users', {
  method: 'get'
})


</script>

<template>
  <div>
    Home Page
  </div>
</template>

<style scoped>

</style>
