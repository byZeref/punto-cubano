<script setup lang="ts">
const authStore = useAuthStore()

onBeforeMount(() => authStore.loadLocalStorageData())
</script>

<template>
  <NuxtLayout>
      <NuxtLoadingIndicator color="#4c1b1e" />
      <NuxtPage />
  </NuxtLayout>
</template>
