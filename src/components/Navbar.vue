<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { uid } from "uid";
import BaseModel from "./BaseModel.vue";
import { computed, ref } from "vue";

const modelActive = ref(null);
const savedCities = ref([]);
const router = useRouter();
const route = useRoute();

const isHomePage = computed(() => route.path === "/" || route.name === "home");

const toggleModel = () => {
  modelActive.value = !modelActive.value;
};

const saveCity = () => {
  if (localStorage.getItem("savedCities")) {
    savedCities.value = JSON.parse(localStorage.getItem("savedCities"));
  }

  const locationObj = {
    id: uid(),
    state: route.params.state,
    city: route.params.city,
  };

  savedCities.value.push(locationObj);
  localStorage.setItem("savedCities", JSON.stringify(savedCities.value));

  let query = Object.assign({}, route.query);
  delete query.preview;
  router.replace({ query });
};

const removeCity = () => {
  const cities = JSON.parse(localStorage.getItem("savedCities"));

  console.log(route.query.id);

  const updatedCities = cities.filter((city) => city.id !== route.query.id);
  localStorage.setItem("savedCities", JSON.stringify(updatedCities));
  router.push({ name: "home" });
};
</script>

<template>
  <header class="sticky top-0 bg-primary shadow-lg z-10">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink>
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-trash text-2xl text-white"></i>
          <p class="text-2xl text-white">Local Weather</p>
          Hello
        </div>
      </RouterLink>
      <div class="flex gap-3 flex-1 justify-end">
        <i
          class="fa-solid fa-circle-info text-xl hover:text-secondary duration-150 cursor-pointer"
          @click="toggleModel"
        ></i>
        <i
          class="fa-solid fa-plus text-xl hover:text-secondary duration-150 cursor-pointer"
          @click="saveCity"
          v-if="route.query.preview"
        ></i>
        <i
          class="fa-solid fa-trash text-xl hover:text-red-500 duration-150 cursor-pointer"
          @click="removeCity"
          v-if="!route.query.preview && !isHomePage"
        ></i>
      </div>
      <BaseModel :modelActive="modelActive" @close-model="toggleModel">
        <h1 class="text-black text-2xl mb-4">How to use this app</h1>
        <ul>
          <li class="text-gray-800">➯ Search your city in the search bar.</li>
          <li class="text-gray-800">
            ➯ Click on your city from the suggested cities.
          </li>
          <li class="text-gray-800">➯ Check weather details.</li>
          <li class="text-gray-800">
            ➯ Click on the "+" icon to add the current city on your homepage.
          </li>
          <li class="text-gray-800">
            ➯ Saved cities will be tracked for you for easy access.
          </li>
          <li class="text-gray-800">
            ➯ Click on the city of your choice from the list of saved cities on
            your homepage to see it's weather information.
          </li>
        </ul>
      </BaseModel>
    </nav>
  </header>
</template>
