import { createRouter, createWebHistory } from 'vue-router'
import FilmsView from '../views/FilmsView.vue'
import WatchedView from '../views/WatchedView.vue'
import MovieNotesView from '../views/MovieNotesView.vue'
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
      path: '/watched',
      name: 'watched',
      component: WatchedView,
    },
    {
      path: '/movies/:id/notes',
      name: 'movie-notes',
      component: MovieNotesView,
    },
    {
      path: '/movies/:id',
      name: 'movie-details',
      component: MovieDetailsView,
    },
  ],
})

export default router