<script setup>
import { RouterLink, useRouter, useRoute } from "vue-router";
import { uid } from "uid";
import BaseModel from "./BaseModel.vue";
import { ref } from "vue";

const modelActive = ref(null);
const savedCities = ref([]);
const router = useRouter();
const route = useRoute();

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
</script>

<template>
  <header class="sticky top-0 bg-primary shadow-lg">
    <nav
      class="container flex flex-col sm:flex-row items-center gap-4 text-white py-6"
    >
      <RouterLink>
        <div class="flex items-center gap-3">
          <i class="fa-solid fa-sun text-2xl"></i>
          <p class="text-2xl">Local Weather</p>
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
      </div>
      <BaseModel :modelActive="modelActive" @close-model="toggleModel">
        <h1 class="text-black text-xl">How to use this app</h1>
        <p class="text-gray-600">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quo totam
          eaque harum voluptatibus dolor excepturi molestiae aliquam repellat
          labore neque ab perspiciatis officia vero quibusdam assumenda iure
          aperiam voluptas amet deserunt recusandae, dicta consequatur nesciunt
          nulla eveniet. Explicabo iste nemo saepe quas amet voluptas,
          doloremque, esse eaque libero cum porro?
        </p>
      </BaseModel>
    </nav>
  </header>
</template>
