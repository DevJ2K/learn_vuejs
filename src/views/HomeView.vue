<template>
  <main class="container text-white">
    <div class="pt-4 mb-8 relative">
      <input type="text" v-model="searchQuery" @input="getSearchResults" placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]">
        <ul class="absolute bg-secondary text-white w-full shadow-md py-2 px-1 top-[66px]" v-if="geocodingSearchResults">
        <p v-if="searchError">Sorry, something went wrong... Please try again.</p>
        <p v-if="!searchError">
          No results match your query, try a different term.
        </p>
        <template v-else>
            <li v-for="searchResult in geocodingSearchResults" :key="searchResult.id" class="py-2 cursor-pointer">
              {{ searchResult.name }}
            </li>
          </template>
        </ul>
    </div>
  </main>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const searchQuery = ref("");
const queryTimeout = ref(null);
const geocodingSearchResults = ref(null);
const searchError = ref(null);

function getSearchResults() {
  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value !== "") {
      try {
        const urlRequest = `https://geocoding-api.open-meteo.com/v1/search?name=${searchQuery.value}&count=10&language=en&format=json`

        const result = await axios.get(urlRequest);
        geocodingSearchResults.value = result.data.results;
        console.log(geocodingSearchResults.value);
        console.log(searchError.value);
      } catch (error) {
        searchError.value = true;
      }
      return ;
    }
    geocodingSearchResults.value = null;
  }, 300);
}
</script>
