<script setup lang="ts">
import MovieCard from '@/components/MovieCard.vue';
import { onMounted, ref } from 'vue';
import {
  getPopularMovies,
  searchMovies,
} from '../services/movieService';
import type { Movie } from '@/types/movie';

const movies = ref<Movie[]>([]);
const loading = ref(false);
const query = ref('');
const searched = ref(false);
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

async function handleSearch() {
  const term = query.value.trim();

  if (!term || loading.value) return;

  loading.value = true;
  error.value = '';
  searched.value = true;

  try {
    movies.value = await searchMovies(term);
  } catch (err) {
    error.value = err instanceof Error
      ? err.message
      : 'Não foi possível pesquisar filmes.';
  } finally {
    loading.value = false;
  }
}

function clearSearch() {
  query.value = '';
  loadMovies();
}

onMounted(() => {
  loadMovies();
});
</script>

<template>
  <section>
    <h1 class="mb-4">Filmes populares</h1>

    <div class="mb-4">
      <h1 class="h2 mb-3">Movie Explorer</h1>

      <form @submit.prevent="handleSearch">
        <div class="input-group">
          <input
            v-model="query"
            type="search"
            class="form-control"
            placeholder="Pesquisar filmes..."
            aria-label="Pesquisar filmes"
          />

          <button
            type="submit"
            class="btn btn-primary"
            :disabled="loading || !query.trim()"
          >
            Pesquisar
          </button>
        </div>
      </form>
    </div>

    <div class="d-flex align-items-center justify-content-between mb-4">
      <h2 class="h4 mb-0">
        {{ searched ? 'Resultados da pesquisa' : 'Filmes populares' }}
      </h2>

      <button
        v-if="searched"
        class="btn btn-outline-secondary btn-sm"
        type="button"
        @click="clearSearch"
      >
        Ver populares
      </button>
    </div>

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