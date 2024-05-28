<template>
	<div class="flex flex-col flex-1 items-center">
		<!-- Banner -->
		<div v-if="route.query.preview" class="text-white p-4 bg-secondary w-full text-center">
			<p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
		</div>
		<!-- Weather Overview -->
		<div class="flex flex-col items-center text-white py-12">
			<h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
			<p class="text-sm mb-12">
				{{ new Date(weatherData.currentTime).toLocaleDateString("fr-fr", {
					weekday: "short",
					day: "2-digit",
					month: "long"
				}) }}
				{{ new Date(weatherData.currentTime).toLocaleTimeString("fr-fr", {
					timeStyle: "short"
				}) }}
			</p>
			<p class="text-8xl mb-8">
				{{ Math.round(weatherData.main.temp) }}&deg
			</p>
				<p>
					Feels like
					{{ Math.round(weatherData.main.feels_like) }}&deg
				</p>
				<p class="capitalize">
					{{ weatherData.weather[0].description }}
				</p>
				<img class="w-[150px] h-auto" :src="`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`">
		</div>

		<hr class="border-white border-opacity-10 border w-full">
	</div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

const apikey = import.meta.env.VITE_API_WEATHERKEY;
// console.log(apikey);
const route = useRoute();
const getWeatherData = async () => {
	try {
		// const url = `https://api.open-meteo.com/v1/forecast?latitude=${route.query.latitude}&longitude=${route.query.longitude}&current=temperature_2m&timezone=auto&forecast_days=1`
		const url = `https://api.openweathermap.org/data/2.5/weather?lat=${route.query.latitude}&lon=${route.query.longitude}&appid=${apikey}&units=metric`

		const weatherData = await axios.get(url);
		console.log(weatherData.data);

		const localOffset = new Date().getTimezoneOffset() * 60000;
		const utc = weatherData.data.dt * 1000 + localOffset;
		weatherData.data.currentTime = utc + 1000 * weatherData.data.timezone
		return weatherData.data;
	} catch (error) {
		console.log(error);
	}
};

const weatherData = await getWeatherData();
console.log(weatherData);
// console.log(weatherData.current.temperature_2m);
</script>
