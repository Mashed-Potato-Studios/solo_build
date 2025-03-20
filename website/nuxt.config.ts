// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content'
  ],
  css: ['~/assets/css/main.css']

})