<script setup>
import { RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <div class="flex flex-col min-h-screen font-ubuntu-mono bg-primary">
    <Navbar />
    <RouterView />
  </div>
</template>
