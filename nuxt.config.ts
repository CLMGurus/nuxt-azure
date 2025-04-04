// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },
  // nitro: {
  //   preset: "node-server",
  // },
  devServer: {
    port: 8080,
    host: "0.0.0.0",
  },
  server: {
    port: 8080,
    host: "0.0.0.0",
  },
});
