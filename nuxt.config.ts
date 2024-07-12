// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxt/eslint",
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase"
  ],
  runtimeConfig: {
    turso: {
      databaseUrl: process.env.NUXT_DATABASE_URL,
      databaseToken: process.env.NUXT_DATABASE_TOKEN,
    },
  },
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
    login: '/',
    callback: '/',
    include: undefined,
    exclude: [],
    cookieRedirect: false,
  }
  },
  app: {
    head: {
      title: 'Punto Cubano',
      meta: [
        { name: 'description', content: 'Tienda de productos cubanos' },
        { property: 'og:title', content: 'Punto Cubano' },
        { property: 'og:description', content: 'Tienda de productos cubanos' },
        // TODO no funciona la imagen :(
        { property: 'og:image', content: 'logo.jpg' },
      ],
      link: [
        { rel: 'icon', href: 'logo.jpg' }
      ]
    },
  },
  ssr: true,
})