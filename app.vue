<template>
  <div>
    <NuxtRouteAnnouncer />
    <h1>Welcome to Nuxt in Azure app services</h1>

    <input type="text" v-model="name" />
    <button @click="fetchApi()">Fetch</button>

    <button @click="getToken()">Token</button>

    <p>{{ data }}</p>

    <p>{{ userData }}</p>
    <p>{{ token }}</p>

    <button @click="fetchProtectApi()">Protect</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
const name = ref();
const userId = ref();
const data = ref();
const userData = ref();
const token = ref();
async function fetchApi() {
  data.value = await $fetch("/api/hello", {
    method: "POST",
    body: {
      name: name.value,
    },
  });
  console.log(data);
}

async function fetchProtectApi() {
  try {
    const response = await $fetch("/api/protect", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.value}`,
      },
    });
    data.value = response;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

async function getToken() {
  try {
    const { user } = await $fetch("/api/token", {
      method: "POST",
      body: {
        userId: name.value,
      },
    });
    userData.value = user;
    token.value = user.access_token;
  } catch (err) {
    console.log(err);
  }
}
</script>
