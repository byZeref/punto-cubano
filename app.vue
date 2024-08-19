<script setup lang="ts">
const error: Ref<string | null> = ref(null)
provide('error', error)

</script>

<template>
  <ErrorDialog
    v-if="!!error"
    :show="!!error"
    :message="error"
    @update:show="(val) => {
      if (!val) error = null
    }"
  />

  <NuxtLayout>
      <NuxtLoadingIndicator color="#7f2c30" />
      <NuxtPage />
  </NuxtLayout>
  
  <UNotifications />
</template>
