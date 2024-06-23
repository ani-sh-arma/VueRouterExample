<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchQuery = ref("");
const searchError = ref("");
const showNoResults = ref(true);
const cities = ref([]);
const queryTimeout = ref(null);
const router = useRouter();

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
          const address = result.address;
          showNoResults.value = true;
          return (
            address.city ||
            address.town ||
            address.village ||
            address.state_district
          );
        });
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, 300);
};

const previewCity = (city) => {
  const cityName = city.name;
  const cityState = city.address.state;
  showNoResults.value = false;
  searchQuery.value = city.display_name;
  cities.value = [];
  console.log(city, cityName, cityState);

  router.push({
    name: "cityview",
    params: { state: cityState, city: cityName },
    query: {
      lat: city.lat,
      lng: city.lon,
      query: searchQuery.value,
      preview: true,
    },
  });
};
</script>

<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input
        @input="searchCity"
        v-model="searchQuery"
        type="text"
        class="w-full bg-gray-800 py-2 px-4 bg-transparent focus:outline-none focus:border-b focus:border-secondary"
        placeholder="Search for a city"
      />
      <ul
        v-if="cities.length"
        class="absolute bg-gray-800 w-full shadow-md py-2 px-1"
      >
        <li
          v-for="city in cities"
          :key="city.place_id"
          class="py-1 px-4 cursor-pointer hover:bg-gray-700 rounded-md"
          @click="previewCity(city)"
        >
          {{ city.display_name }}
        </li>
      </ul>
      <p
        v-else-if="searchError"
        class="absolute rounded-md bg-red-800 w-full shadow-md py-2 px-4"
      >
        {{ searchError }}
      </p>
      <p
        v-else-if="searchQuery && !cities.length && showNoResults"
        class="absolute bg-gray-800 w-full shadow-md py-2 px-1"
      >
        No results, try something else.
      </p>
    </div>
  </main>
</template>
