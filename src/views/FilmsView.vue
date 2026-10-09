<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import { onMounted, ref } from 'vue';
import {
  getPopularMovies
} from '../services/movieService';
import type { Movie } from '@/types/movie';

const movies = ref<Movie[]>([]);
const loading = ref(false);
const error = ref('');

async function loadMovies() {
  loading.value = true;
  error.value = '';

  try {
    movies.value = await getPopularMovies();

    console.log('Filmes carregados:', movies.value);
  } catch (err) {
    error.value = err instanceof Error
      ? err.message
      : 'Não foi possível carregar os filmes.';
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadMovies();
});
</script>

<template>
  <section>
    <h1 class="mb-4">Filmes populares</h1>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-2">Carregando filmes...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}

      <button class="btn btn-outline-danger ms-3" @click="loadMovies">
        Tentar novamente
      </button>
    </div>

    <div v-else class="row g-4">
      <MovieCard v-for="movie in movies" :key="movie.id" :movie="movie" class="col-6 col-md-4 col-lg-3" />
    </div>
  </section>
</template>