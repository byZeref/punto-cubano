<script setup>
import IconMail from '~/components/icons/IconMail.vue'
import IconCertificate from '~/components/icons/IconCertificate.vue'
import IconPhone from '~/components/icons/IconPhone.vue'
import IconWhatsapp from '~/components/icons/IconWhatsapp.vue'
import IconFacebook from '~/components/icons/IconFacebook.vue'
import IconInstagram from '~/components/icons/IconInstagram.vue'

const { OPERATOR_NUMBER, OPERATOR_EMAIL, FACEBOOK_URL, INSTAGRAM_URL } = config
const isDarkMode = useCookie('dark')
</script>

<template>
  <section>
    <div class="min-h-[500px] w-[full] sm:max-w-xl border border-gray-300 border-1 mx-auto rounded-md p-4 sm:p-6 bg-white dark:bg-gray-900 dark:border-gray-700">
      <img class="h-[250px] w-auto mx-auto mb-2 aspect-square" src="/logo.png" alt="company logo">
      <div class="description">
        <div class="description--row flex items-center gap-3 mb-4">
          <IconCertificate :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">Nombre de la empresa</p>
            <p class="text-slate-700 dark:text-slate-300">Punto Cubano</p>
          </div>
        </div>
        <div class="description--row flex items-center gap-3 mb-4">
          <IconMail :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">Correo electrónico</p>
            <a :href="`mailto:${OPERATOR_EMAIL}`" target="_blank" class="text-blue-500 dark:text-blue-400">
              {{ OPERATOR_EMAIL }}
            </a>
          </div>
        </div>
        <div class="description--row flex items-center gap-3 mb-4">
          <IconPhone :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">Teléfono</p>
            <a :href="`tel:${OPERATOR_NUMBER}`" target="_blank" class="text-blue-500 dark:text-blue-400">
              {{ OPERATOR_NUMBER }}
            </a>
          </div>
        </div>
        <div class="description--row flex items-center gap-3 mb-4">
          <IconWhatsapp :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">WhatsApp</p>
            <a :href="`https://wa.me/${OPERATOR_NUMBER}`" target="_blank" class="text-blue-500 dark:text-blue-400">
              {{ OPERATOR_NUMBER }}
            </a>
          </div>
        </div>
        <div class="description--row flex items-center gap-3 mb-4">
          <IconFacebook :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">Facebook</p>
            <a :href="`fb://${FACEBOOK_URL}`" target="_blank" class="text-blue-500 dark:text-blue-400">
              {{ FACEBOOK_URL }}
            </a>
          </div>
        </div>
        <div class="description--row flex items-center gap-3 mb-4">
          <IconInstagram :color="isDarkMode ? 'white' : 'black'" size="32" />
          <div>
            <p class="text-slate-700 dark:text-slate-300 font-bold leading-4">Instagram</p>
            <a :href="`instagram://user?username=${INSTAGRAM_URL}`" target="_blank" class="text-blue-500 dark:text-blue-400">
              {{ INSTAGRAM_URL }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>

</style>
