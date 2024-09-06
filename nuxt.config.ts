// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-09-06",
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
  extends: ["@nuxt/ui-pro"],
  modules: ["@nuxt/ui", "@nuxt/fonts"],
});
