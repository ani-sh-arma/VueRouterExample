<script setup>
import { ref } from "vue";

const searchQuery = ref("");
const searchError = ref("");
const cities = ref([]);
const queryTimeout = ref(null);
const searchCity = () => {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(() => {
    if (searchQuery === "") {
      cities.value = [];
      return;
    }

    const url = `https://nominatim.openstreetmap.org/search?q=${searchQuery.value}&format=json&addressdetails=1&limit=10`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        cities.value = data.filter((result) => {
          console.log(result);
          return result.address.city || result.address.town;
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, 300);
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        @input="searchCity"
        v-model="searchQuery"
        type="text"
        class="w-full bg-gray-800 py-2 px-1 bg-transparent focus:outline-none focus:border-b focus:border-secondary"
        placeholder="Search for a city"
      />
      <ul
        v-if="cities.length"
        class="absolute bg-gray-800 w-full shadow-md py-2 px-1"
      >
        <li v-for="city in cities" :key="city.place_id">
          {{ city.display_name }}
        </li>
      </ul>
      <p
        v-if="searchError"
        class="absolute rounded-md bg-red-800 w-full shadow-md py-2 px-4"
      >
        {{ searchError }}
      </p>
      <p
        v-else
        v-show="searchQuery"
        class="absolute bg-gray-800 w-full shadow-md py-2 px-1"
      >
        No results, try something else.
      </p>
    </div>
  </main>
</template>
