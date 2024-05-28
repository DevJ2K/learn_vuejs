<template>
	<div class="flex flex-col flex-1 items-center">
		<!-- Banner -->
		<div v-if="route.query.preview" class="text-white p-4 bg-secondary w-full text-center">
			<p>You are currently previewing this city, click the "+" icon to start tracking this city.</p>
		</div>
		<!-- Weather Overview -->
		<div class="flex flex-col items-center text-white py-12">
			<h1 class="text-4xl mb-2">{{ route.params.city }}</h1>
			<p class="text-sm mb-12">Date</p>
			<p class="text-8xl mb-8">
				{{ Math.round(weatherData.current.temperature_2m) }}&deg
			</p>
			<div class="text-center">

			</div>
		</div>
	</div>
</template>

<script setup>
import axios from 'axios';
import { useRoute } from 'vue-router';

console.log(import.meta.env.VITE_API_WEATHERKEY);

const route = useRoute();
const getWeatherData = async () => {
	try {
		const url = `https://api.open-meteo.com/v1/forecast?latitude=${route.query.latitude}&longitude=${route.query.longitude}&current=temperature_2m&timezone=auto&forecast_days=1`
		// const url = `https://api.open-meteo.com/v1/forecast?latitude=${route.query.latitude}&longitude=${route.query.longitude}&hourly=temperature_2m&timezone=auto&forecast_days=1`

		const weatherData = await axios.get(url);

		// const localOffset = new Date().getTimezoneOffset() * 60000;
		// const utc = weatherData.data.timezone
		return weatherData.data;
	} catch (error) {
		console.log(error);
	}
};

const weatherData = await getWeatherData();
console.log(weatherData);
// console.log(weatherData.current.temperature_2m);
</script>
