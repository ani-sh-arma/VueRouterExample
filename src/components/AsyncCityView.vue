<template>
  <div class="flex flex-col items-center bg-primary text-white min-h-screen">
    <div v-if="route.query.preview" class="p-4 bg-secondary w-full text-center">
      <p>
        Currently in preview mode. Click the + icon to start tracking this city.
      </p>
    </div>

    <div class="flex flex-col items-center py-12">
      <p class="text-5xl">{{ route.query.cityName }}</p>
      <p v-if="weatherData" class="text-xl">
        {{
          new Date(weatherData.currentTime).toLocaleDateString("en-us", {
            month: "long",
            day: "numeric",
            year: "numeric",
          })
        }}
      </p>
    </div>

    <div
      class="w-full max-w-screen-md mx-auto p-6 bg-secondary rounded-xl shadow-md space-y-4 text-white"
    >
      <div class="flex justify-center flex-row">
        <div class="flex flex-col text-center items-center">
          <h1 class="text-6xl text-center">
            {{ weatherData ? convertTemp(weatherData.main.temp) : "Loading" }}°
          </h1>
          <p class="text-xl">
            {{ weatherData ? weatherData.weather[0].description : "..." }}
          </p>
        </div>
      </div>

      <div class="flex justify-center py-4 text-xl">
        <div class="flex flex-col items-center">
          <h2 class="text-lg font-semibold">Today's Feels Like Temperature</h2>
          <p class="text-lg">
            Due to humidity it will feel like
            {{
              weatherData ? convertTemp(weatherData.main.feels_like) : "..."
            }}°C
          </p>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-screen-md mx-auto my-2 p-6 bg-transparent rounded-xl shadow-md space-y-4 text-white"
    >
      <div class="py-4 gap-4 grid grid-cols-3 grid-rows-2">
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-arrow-down-short-wide text-5xl m-4"></i>
          Air Pressure
          <p class="text-xl">
            {{ weatherData ? weatherData.main.pressure : "..." }} hPa
          </p>
        </div>
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-droplet text-5xl m-4"></i>
          Humidity
          <p class="text-xl">
            {{ weatherData ? weatherData.main.humidity : "..." }}%
          </p>
        </div>
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-eye text-5xl m-4"></i>
          Visibility
          <p class="text-xl">
            {{ weatherData ? weatherData.visibility / 1000 : "..." }} km
          </p>
        </div>
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-wind text-5xl m-4"></i>
          Wind
          <p :class="divClass">
            {{ weatherData ? weatherData.wind.speed : "..." }} m/s,
            {{ weatherData ? weatherData.wind.deg : "..." }}°
          </p>
        </div>
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-cloud text-5xl m-4"></i>
          Cloudiness
          <p class="text-xl">
            {{ weatherData ? weatherData.clouds.all : "..." }}%
          </p>
        </div>
        <div
          class="p-4 rounded-lg h-40 w-full bg-secondary flex flex-col items-center text-md"
        >
          <i class="fa-solid fa-cloud-rain text-5xl m-4"></i>
          Rain (1h)
          <p class="text-xl">
            {{
              weatherData && weatherData.rain ? weatherData.rain["1h"] : "0"
            }}mm
          </p>
        </div>
      </div>
    </div>

    <div
      class="w-full max-w-screen-md mx-auto mt-0 mb-10 p-6 bg-secondary rounded-xl shadow-md space-y-4 text-white"
    >
      <div class="flex flex-row w-full justify-between">
        <i class="fa-solid fa-cloud-sun text-5xl mx-2"></i>
        <i class="fa-solid fa-mountain-sun text-5xl mx-2"></i>
      </div>
      <div class="flex flex-row w-full justify-between">
        <h1 class="text-2xl">Sunrise</h1>
        <h1 class="text-2xl">Sunset</h1>
      </div>
      <div class="w-full bg-gray-800 rounded-full h-4">
        <div
          class="h-4 rounded-full float-right relative flex flex-row"
          :style="{width: dayFinished + '%'}"
        >
          <i
            class="fa-solid fa-sun text-2xl absolute left-0 top-1/2 -translate-y-1/2"
          ></i>
          <div class="h-4 rounded-full bg-white w-[95%] absolute right-0"></div>
        </div>
      </div>
      <div class="flex flex-row w-full justify-between">
        <h1 class="text-2xl">{{ sunriseTime }}</h1>
        <h1 class="text-2xl">{{ sunsetTime }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();
const weatherData = ref(null);
const error = ref("");
const screenWidth = ref(window.innerWidth);
const sunriseTime = ref(null);
const sunsetTime = ref(null);
const dayFinished = ref(null);

const divClass = computed(() => {
  if (screenWidth.value < 620) {
    return "text-sm";
  } else {
    return "text-xl";
  }
});

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${route.query.cityName}&APPID=f2229e857229b10c77875da242deb48e`
    );

    const utcTime = response.data.dt * 1000; // Convert seconds to milliseconds
    const currentTime = utcTime + response.data.timezone * 1000; // Adjust by timezone offset

    response.data.currentTime = currentTime;

    weatherData.value = response.data;
  } catch (e) {
    error.value = e;
    console.error(error);
  }
};

const convertTemp = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

const updateScreenWidth = () => {
  screenWidth.value = window.innerWidth;
};

const getSunriseAndSunset = async () => {
  await getWeatherData();
  const sunrise = weatherData.value.sys.sunrise;
  const sunset = weatherData.value.sys.sunset;
  const current = Date.now();
  const percent =
    ((current - sunrise * 1000) / (sunset * 1000 - sunrise * 1000)) * 100;
  dayFinished.value = Math.floor(100 - percent);
  console.log(dayFinished.value);
  sunriseTime.value = new Date(sunrise * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
  sunsetTime.value = new Date(sunset * 1000).toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

onMounted(() => {
  window.addEventListener("resize", updateScreenWidth);
  getSunriseAndSunset();
});
</script>

<style scoped>
.weather-main {
  display: flex;
  flex-direction: column;
}
</style>
