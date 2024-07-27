// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    // "@nuxtjs/tailwindcss",
    "@nuxt/eslint",
    "@pinia/nuxt",
    "@nuxtjs/i18n",
    "@nuxtjs/supabase",
    "@nuxt/ui"
  ],
  css: ["@/assets/css/main.css"],
  supabase: {
    url: process.env.SUPABASE_URL,
    key: process.env.SUPABASE_KEY,
    redirectOptions: {
      login: '/auth',
      callback: '/',
      include: ['/admin'],
      exclude: [],
      cookieRedirect: false,
    }
  },
  app: {
    head: {
      title: 'Punto Cubano',
      meta: [
        { name: 'theme-color', content: '#4c1b1e' },
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
  ssr: false,
  // routeRules: {
  //   '/admin': { ssr: false }
  // }

  // runtimeConfig: {
  //   turso: {
  //     databaseUrl: process.env.NUXT_DATABASE_URL,
  //     databaseToken: process.env.NUXT_DATABASE_TOKEN,
  //   },
  // },
})