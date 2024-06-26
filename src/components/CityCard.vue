<script setup>
defineProps({
  city: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <div class="flex py-6 px-10 bg-secondary rounded-md shadow-md cursor-pointer">
    <div class="flex flex-col flex-1">
      <h2 class="text-3xl">{{ city.city }}</h2>
      <h3>{{ city.state }}</h3>
    </div>
    <div class="flex flex-col gap-2">
      <p class="text-3xl self-end">{{ (city.weather.main.temp - 273.15).toFixed(2) }} °C</p>
    </div>
  </div>
</template>
