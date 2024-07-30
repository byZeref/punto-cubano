<script setup>
import IconHome from '~/components/icons/IconHome.vue'
import IconShoppingBag  from '~/components/icons/IconShoppingBag.vue'
import IconShoppingCart  from '~/components/icons/IconShoppingCart.vue'
import IconContactUs  from '~/components/icons/IconContactUs.vue'
import IconLogout  from '~/components/icons/IconLogout.vue'
import CompanyMobile from '~/components/navbar/CompanyMobile.vue'

const emit = defineEmits(['close'])
const props = defineProps({
  isOpen: Boolean,
  isDarkMode: Boolean,
  isLogged: Boolean,
  logout: Function,
})

const ui = {
  overlay: {
    background: 'bg-black/50 dark:bg-gray-800/75',
  },
  transition: {
    enter: 'transform transition ease-in-out duration-300',
    leave: 'transform transition ease-in-out duration-200',
  },
}
const opened = ref(props.isOpen)

const closeWithTransition = () => {
  setTimeout(() => {
    emit('close')
  }, 300)
}

watchEffect(() => {
  if (opened.value === false) closeWithTransition()
})

const route = useRoute()
const getColor = (iconRoute) => {
  return props.isDarkMode
    ? '#fff'
    : route.path === iconRoute ? 'var(--primary-color)' : 'black'
}

const goHome = () => {
  console.log('go home')
}
</script>

<template>
  <USlideover v-model="opened" side="left" class="w-[70%]" :ui>
    <div class="p-4 pt-2 flex-1 dark:bg-[#151d26]">
      <UButton
        color="gray"
        variant="ghost"
        size="sm"
        icon="i-heroicons-x-mark-20-solid"
        class="flex sm:hidden absolute end-5 top-5 z-10"
        square
        padded
        @click="opened = false"
      />
      <CompanyMobile :is-open="isOpen" :is-dark-mode="isDarkMode" @click="opened = false" />
      <div class="px-4">
        
        <div class="pt-12 flex flex-col gap-7">
          <NuxtLink class="flex items-center gap-2" to="/" @click="opened = false">
            <!-- <IconHome :color="isDarkMode ? '#fff' : 'black'" /> -->
            <IconHome :color="getColor('/')" />
            <span class="text-lg">Inicio</span>
          </NuxtLink>
          <NuxtLink class="flex items-center gap-2" to="/products" @click="opened = false">
            <IconShoppingBag :color="getColor('/products')" />
            <span class="text-lg">Productos</span>
          </NuxtLink>
          <NuxtLink class="flex items-center gap-2" to="/cart" @click="opened = false">
            <IconShoppingCart :color="getColor('/cart')" />
            <span class="text-lg">Carrito</span>
          </NuxtLink>
          <NuxtLink class="flex items-center gap-2" to="/contact" @click="opened = false">
            <IconContactUs :color="getColor('/contact')" />
            <span class="text-lg">Contacténos</span>
          </NuxtLink>
          <NuxtLink v-if="isLogged" class="flex items-center gap-2" @click="logout">
            <IconLogout :color="isDarkMode ? '#fff' : 'black'" />
            <span class="text-lg">Cerrar Sesión</span>
          </NuxtLink>
        </div>
      </div>
    </div>
  </USlideover>
</template>

<style scoped>
button {
  background-color: #4c1b1e1e;
  top: 17px;
}
</style>
