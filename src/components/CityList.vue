<script setup>
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();
const savedCities = ref([]);
const getCities = async () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));

    const requests = [];
    savedCities.value.forEach((city) => {
      requests.push(
        axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${city.city}&APPID=f2229e857229b10c77875da242deb48e`
        )
      );
    });

    const weatherData = await Promise.all(requests);
    weatherData.forEach((data, index) => {
      savedCities.value[index].weather = data.data;
    });
  }
};

await getCities();

const goToCityView = (city) => {
  router.push({
    name: "cityview",
    params: { state: city.state, city: city.city },
    query: {
      id: city.id,
      cityName: city.city,
    },
  });
};
</script>

<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0" class="text-center text-xl mt-20">
    No cities saved. Search above to start tracking.
  </p>

  <div class="h-4"></div>
</template>
