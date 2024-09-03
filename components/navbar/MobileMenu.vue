<script setup>
import IconHome from '~/components/icons/IconHome.vue'
import IconShoppingBag  from '~/components/icons/IconShoppingBag.vue'
import IconShoppingCart  from '~/components/icons/IconShoppingCart.vue'
import IconContactUs  from '~/components/icons/IconContactUs.vue'
import IconLogout  from '~/components/icons/IconLogout.vue'
import IconAdmin  from '~/components/icons/IconAdmin.vue'
import IconOrders  from '~/components/icons/IconOrders.vue'
import CompanyMobile from '~/components/navbar/CompanyMobile.vue'
import {useAuthStore} from '@/stores/auth'
const store = useAuthStore()
const user = computed(() => store.user)

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
      <div class="px-4 pt-8 flex flex-col gap-4">
        <NuxtLink class="flex items-center gap-2" to="/" @click="opened = false">
          <IconHome :color="getColor('/')" />
          <span class="">Inicio</span>
        </NuxtLink>
        <NuxtLink class="flex items-center gap-2" to="/products" @click="opened = false">
          <IconShoppingBag :color="getColor('/products')" />
          <span class="">Productos</span>
        </NuxtLink>
        <NuxtLink v-if="!isLogged" class="flex items-center gap-2" to="/cart" @click="opened = false">
          <IconShoppingCart :color="getColor('/cart')" />
          <span class="">Carrito</span>
        </NuxtLink>
        <NuxtLink v-if="!isLogged" class="flex items-center gap-2" to="/contact" @click="opened = false">
          <IconContactUs :color="getColor('/contact')" />
          <span class="">Contacténos</span>
        </NuxtLink>
        <NuxtLink class="flex items-center gap-2" to="/admin" @click="opened = false">
          <IconOrders :color="getColor('/admin')" />
          <span class="">Pedidos</span>
        </NuxtLink>
        <NuxtLink v-if="isLogged" class="flex items-center gap-2" @click="logout">
          <IconLogout :color="isDarkMode ? '#fff' : 'black'" />
          <span class="">Cerrar Sesión</span>
        </NuxtLink>
      </div>
      <div v-if="user" class="user-info">
        <p class="text-center mx-auto">{{ user.email }}</p>
      </div>
    </div>
  </USlideover>
</template>

<style scoped>
button {
  background-color: #4c1b1e1e;
  top: 17px;
}
.user-info {
  position: absolute;
  bottom: 12px;
  display: flex;
  width: calc(100% - 32px);
  p {
    background-color: #7f2c30;
    color: #fff;
    padding: 4px 8px;
    border-radius: 4px;
  }
}
</style>
