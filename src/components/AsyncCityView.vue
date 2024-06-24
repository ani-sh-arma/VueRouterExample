<template>
  <div class="weather-container" v-if="weatherData">
    <h1>Weather in {{ weatherData.name }}, {{ weatherData.sys.country }}</h1>
    <div class="weather-main">
      <div>
        <h2>Main Weather</h2>
        <div v-for="weather in weatherData.weather" :key="weather.id" class="weather-info">
          <img :src="`http://openweathermap.org/img/wn/${weather.icon}@2x.png`" :alt="weather.description" />
          <p>{{ weather.main }}: {{ weather.description }}</p>
        </div>
      </div>
      <div>
        <h2>Temperature</h2>
        <p>Current: {{ convertTemp(weatherData.main.temp) }}°C</p>
        <p>Feels Like: {{ convertTemp(weatherData.main.feels_like) }}°C</p>
        <p>Min: {{ convertTemp(weatherData.main.temp_min) }}°C</p>
        <p>Max: {{ convertTemp(weatherData.main.temp_max) }}°C</p>
      </div>
      <div>
        <h2>Details</h2>
        <p>Pressure: {{ weatherData.main.pressure }} hPa</p>
        <p>Humidity: {{ weatherData.main.humidity }}%</p>
        <p>Visibility: {{ weatherData.visibility / 1000 }} km</p>
        <p>Wind: {{ weatherData.wind.speed }} m/s, {{ weatherData.wind.deg }}°</p>
        <p>Cloudiness: {{ weatherData.clouds.all }}%</p>
        <p>Rain (1h): {{ weatherData.rain ? weatherData.rain['1h'] : '0' }} mm</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { ref, onMounted } from 'vue';
import { useRoute } from "vue-router";

const route = useRoute();
const weatherData = ref(null);

const getWeatherData = async () => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${route.query.query}&APPID=f2229e857229b10c77875da242deb48e`
    );

    // Calculate current date & time
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = response.data.dt * 1000 + localOffset;
    response.data.currentTime = utc + 1000 * response.data.timezone_offset;

    weatherData.value = response.data;
  } catch (error) {
    console.error(error);
  }
};

const convertTemp = (kelvin) => {
  return (kelvin - 273.15).toFixed(2);
};

onMounted(() => {
  getWeatherData();
});
</script>

<style>
.weather-container {
  font-family: Arial, sans-serif;
  padding: 20px;
  background: #f0f0f0;
  border-radius: 10px;
  max-width: 500px;
  margin: auto;
}
.weather-main {
  display: flex;
  flex-direction: column;
}
.weather-info {
  display: flex;
  align-items: center;
}
.weather-info img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.weather-main > div {
  margin-bottom: 20px;
}
</style>
