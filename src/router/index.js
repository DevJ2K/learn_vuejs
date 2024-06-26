import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import CityView from '../views/CityView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: "Home"
      }
    },
    {
      path: '/weather/:country/:city',
      name: 'cityView',
      component: CityView,
      meta: {
        title: "Weather"
      }
    }
  ]
});

router.beforeEach((to, from, next) => {
  document.title = `${to.params.country
    ? `${to.params.country}, ${to.params.city}`
    : to.meta.title
  } | The Local Weather`;
  next();
})

export default router
