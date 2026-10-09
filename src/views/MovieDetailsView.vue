<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetails } from '../services/movieService';
import type { MovieDetails } from '@/types/movie';

const route = useRoute();
const movie = ref<MovieDetails | null>(null);
const loading = ref(false);
const error = ref('');

async function loadMovieDetails() {
  loading.value = true;
  error.value = '';

  try {
    const movieId = Number(route.params.id);
    movie.value = await getMovieDetails(movieId);
  } catch (err) {
    error.value = 'Erro ao carregar detalhes do filme.';
    console.error('Erro ao carregar detalhes do filme:', err);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  loadMovieDetails();
});
</script>

<template>
    <h1>Detalhes do Filme</h1>
    <div v-if="loading" class="text-center py-5">
        <div class="spinner-border" role="status">
            <span class="visually-hidden">Carregando...</span>
        </div>
        <p class="mt-2">Carregando detalhes do filme...</p>
    </div>
    <a v-else-if="error" class="alert alert-danger">
        {{ error }}
        <button class="btn btn-outline-danger ms-3" @click="loadMovieDetails">
            Tentar novamente
        </button>
    </a>
    <div v-else-if="movie">
        <h2>{{ movie.title }}</h2>
        <p>{{ movie.overview }}</p>
        <p><strong>Classificação:</strong> {{ movie.vote_average }}</p>
        <p><strong>Data de Lançamento:</strong> {{ movie.release_date }}</p>
        <p><strong>Duração:</strong> {{ movie.runtime }} minutos</p>
        <p><strong>Gêneros:</strong> {{ movie.genres.map((g) => g.name).join(', ') }}</p>
        <p><strong>Tagline:</strong> {{ movie.tagline }}</p>
        <p><strong>Status:</strong> {{ movie.status }}</p>
        <p><strong>Orçamento:</strong> ${{ movie.budget.toLocaleString() }}</p>
        <p><strong>Receita:</strong> ${{ movie.revenue.toLocaleString() }}</p>
    </div>
</template>