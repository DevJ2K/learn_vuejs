<template>
  <div class="flex flex-col min-h-screen font-Poppins bg-primary">
    <SiteNavigation />
    <RouterView v-slot="{Component}">
      <Transition name="page" mode="out-in">
        <component :is="Component"/>
      </Transition>
    </RouterView>
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router';
import SiteNavigation from './components/SiteNavigation.vue';
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: 300ms ease all;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
