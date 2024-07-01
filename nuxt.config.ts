// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: ["@nuxt/eslint", "@nuxtjs/tailwindcss", "@pinia/nuxt", "@nuxtjs/i18n"],
  runtimeConfig: {
    turso: {
      databaseUrl: process.env.NUXT_DATABASE_URL,
      databaseToken: process.env.NUXT_DATABASE_TOKEN,
    },
  }
})