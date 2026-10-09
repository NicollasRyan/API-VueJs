import { createRouter, createWebHistory } from 'vue-router'
import FavoritesView from '../views/FavoritesView.vue'
import FilmsView from '../views/FilmsView.vue'
import MovieDetailsView from '../views/MovieDetailsView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'films',
      component: FilmsView,
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: FavoritesView,
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: MovieDetailsView,
    },
  ],
})

export default router