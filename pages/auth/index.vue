<script setup>
definePageMeta({
  layout: "auth",
})

const colorMode = useColorMode()

const toggleTheme = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen">
    <UCard>
      <h3 class="text-2xl text-center">Login Page</h3>
      <div class="max-w-xs flex flex-col gap-4 items-center mx-auto mt-4">
        <UInput
          color="cyan"
          type="text"
          size="sm"
          icon="i-heroicons-envelope" 
          placeholder="Usuario"
          class="w-full"
          />
          <UInput
          color="cyan"
          type="password"
          size="sm"
          icon="i-heroicons-lock-closed" 
          placeholder="Contraseña"
          class="w-full"
        />
        <UButton color="cyan" block @click="toggleTheme">
          <span class="text-center">Iniciar Sesión</span>
        </UButton>
      </div>
    </UCard>
  </div>
</template>

<style scoped>
.navbar {
  padding: 0 calc(20vw);
}
</style>
