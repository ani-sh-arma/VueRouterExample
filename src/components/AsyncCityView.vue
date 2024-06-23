<script setup>
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const getWeatherData = async () => {
  try {
    const weatherData = await axios.get(
      //   `https://api.openweathermap.org/data/3.0/onecall?lat=${route.query.lat}&lon=${route.query.lng}&exclude={part}&appid=f2229e857229b10c77875da242deb48e`
      `https://api.openweathermap.org/data/2.5/weather?q=${route.query.query}&APPID=f2229e857229b10c77875da242deb48e`
    );

    // open weather one call api requires card info and for free tier they only allow the use of free tier
    // api which does not provide hourly data so see what to do about that.

    // cal current date & time
    console.log(weatherData);
    const localOffset = new Date().getTimezoneOffset() * 60000;
    const utc = weatherData.data.dt * 1000 + localOffset;
    weatherData.data.currentTime =
      utc + 1000 * weatherData.data.timezone_offset;

    // cal hourly weather offset
    weatherData.data.hourly.forEach((hour) => {
      const utc = hour.dt * 1000 + localOffset;
      hour.currentTime = utc + 1000 * weatherData.data.timezone_offset;
    });

    return weatherData;
  } catch (error) {
    console.log(error);
  }
};

const weatherData = await getWeatherData();
</script>

<template>
  <div></div>
</template>
