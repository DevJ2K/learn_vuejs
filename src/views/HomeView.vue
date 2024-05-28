<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
        <ul class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="geocodingSearchResults">
        <p v-if="searchError">Sorry, something went wrong... Please try again.</p>
        <p v-else-if="!searchError && geocodingSearchResults.length === 0">
          No results match your query, try a different term.
        </p>
        <template v-else>
            <li v-for="searchResult in geocodingSearchResults" :key="searchResult.id" class="py-2 cursor-pointer" @click="previewCity(searchResult)">
              {{ searchResult.name }}, {{ searchResult.country }}
            </li>
          </template>
        </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense>
        <CityList/>
        <template #fallback>Loading...</template>
      </Suspense>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
import CityList from '@/components/CityList.vue';

const searchQuery = ref("");
const queryTimeout = ref(null);
const geocodingSearchResults = ref(null);
const searchError = ref(null);

const router = useRouter();
function previewCity(searchResult) {
  console.log(searchResult);
  router.push({
    name: 'cityView',
    params: {
      country: searchResult.country,
      city: searchResult.name
    },
    query: {
      latitude: searchResult.latitude,
      longitude: searchResult.longitude,
      preview: true
    }
  })
}

function getSearchResults() {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const urlRequest = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery.value}&count=10&language=en&format=json`

        const result = await axios.get(urlRequest);
        geocodingSearchResults.value = result.data.results ?? [];
        console.log(geocodingSearchResults.value);
        // console.log(searchError.value);
        // searchError.value = false;

      } catch (error) {
        searchError.value = true;
      }
      return ;
    }
    geocodingSearchResults.value = null;
  }, 300);
}
</script>
