<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Welcome to Nuxt in Azure app services</h1>

    <p>{{ data }}</p>
  </div>
</template>

<script setup>
const { data } = await useFetch("/api/hello");
</script>
