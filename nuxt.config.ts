// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
    url: "/ds",
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
  runtimeConfig: {
    paseto: {
      secret: "",
    },
  },
});
