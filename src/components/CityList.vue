<template>
	<div v-for="city in savedCities" :key="city.id">
		<CityCard :city="city" @click="goToCityView(city)" />
	</div>

	<p v-if="savedCities.length === 0">No location added. To start tracking a location, search in the field above.</p>
</template>

<script setup>
import axios from "axios";
import { ref } from "vue";
import CityCard from "./CityCard.vue";
import { useRouter } from "vue-router";

const savedCities = ref([]);
const apikey = import.meta.env.VITE_API_WEATHERKEY;

const getCities = async () => {
	let cities = localStorage.getItem("savedCities");
	if (cities) {
		savedCities.value = JSON.parse(cities);
	}

	const requests = [];
	savedCities.value.forEach((city) => {
		requests.push(
			axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${city.coords.latitude}&lon=${city.coords.longitude}&appid=${apikey}&units=metric`)
		)
	});

	const weatherData = await Promise.all(requests);

	weatherData.forEach((value, index) => {
		savedCities.value[index].weather = value.data;
	});

}
await getCities();

const router = useRouter();
const goToCityView = (city) => {
	router.push({
		name: 'cityView',
		params: {
			country: city.country,
			city: city.city
		},
		query: {
			id: city.id,
			latitude: city.coords.latitude,
			longitude: city.coords.longitude
		}
	})
}
</script>

