
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getMovieDetails } from '../services/movieService';
import type { Movie, MovieDetails } from '@/types/movie';
import { useWatchedStore } from '@/stores/watchedStore';

const route = useRoute();
const watchedStore = useWatchedStore();

const movie = ref<MovieDetails | null>(null);
const loading = ref(false);
const error = ref('');

const movieId = computed(() => Number(route.params.id));

const watchedRecord = computed(() =>
  watchedStore.watchedMovies.find(
    (record) => record.movie.id === movieId.value,
  ),
);

const isWatched = computed(() =>
  watchedStore.isWatched(movieId.value),
);

function toggleWatched() {
  if (!movie.value) return;

  if (isWatched.value) {
    watchedStore.removeWatched(movie.value.id);
  } else {
    // A store recebe Movie; os campos adicionais dos detalhes são ignorados.
    const movieToSave: Movie = {
      id: movie.value.id,
      title: movie.value.title,
      overview: movie.value.overview,
      poster_path: movie.value.poster_path,
      vote_average: movie.value.vote_average,
      release_date: movie.value.release_date,
      genre_ids: movie.value.genres.map((genre) => genre.id),
    };

    watchedStore.addWatched(movieToSave);
  }
}

async function loadMovieDetails() {
  loading.value = true;
  error.value = '';

  try {
    movie.value = await getMovieDetails(movieId.value);
  } catch (err) {
    error.value = 'Erro ao carregar detalhes do filme.';
    console.error(err);
  } finally {
    loading.value = false;
  }
}

onMounted(loadMovieDetails);
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Detalhes do filme</h1>

    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Carregando...</span>
      </div>
      <p class="mt-2">Carregando detalhes do filme...</p>
    </div>

    <div v-else-if="error" class="alert alert-danger">
      {{ error }}
      <button
        class="btn btn-outline-danger ms-3"
        @click="loadMovieDetails"
      >
        Tentar novamente
      </button>
    </div>

    <div v-else-if="movie">
      <div class="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
        <h2 class="mb-0">{{ movie.title }}</h2>

        <button
          type="button"
          class="btn"
          :class="isWatched ? 'btn-success' : 'btn-outline-success'"
          :aria-pressed="isWatched"
          @click="toggleWatched"
        >
          {{ isWatched ? '✓ Já assisti' : '+ Marcar como assistido' }}
        </button>
      </div>

      <p>{{ movie.overview }}</p>
      <p><strong>Classificação TMDB:</strong> {{ movie.vote_average }}</p>
      <p><strong>Data de lançamento:</strong> {{ movie.release_date }}</p>
      <p><strong>Duração:</strong> {{ movie.runtime }} minutos</p>
      <p>
        <strong>Gêneros:</strong>
        {{ movie.genres.map((g) => g.name).join(', ') }}
      </p>
      <p><strong>Tagline:</strong> {{ movie.tagline }}</p>
      <p><strong>Status:</strong> {{ movie.status }}</p>
      <p><strong>Orçamento:</strong> ${{ movie.budget.toLocaleString() }}</p>
      <p><strong>Receita:</strong> ${{ movie.revenue.toLocaleString() }}</p>

      <section v-if="watchedRecord" class="card mt-4">
        <div class="card-body">
          <h3 class="h5">Meu registro</h3>

          <p>
            <strong>Vezes assistidas:</strong>
            {{ watchedRecord.watchCount }}
          </p>

          <p v-if="watchedRecord.personalRating !== null">
            <strong>Minha nota:</strong>
            {{ watchedRecord.personalRating }}/10
          </p>
          <p v-else class="text-secondary">
            Você ainda não avaliou este filme.
          </p>

          <h4 class="h6">Minha observação</h4>

          <p v-if="watchedRecord.observation.trim()">
            {{ watchedRecord.observation }}
          </p>
          <p v-else class="text-secondary">
            Nenhuma observação adicionada.
          </p>

          <RouterLink
            :to="`/movies/${movie.id}/notes`"
            class="btn btn-outline-primary"
          >
            Adicionar ou editar nota
          </RouterLink>
        </div>
      </section>
    </div>
  </main>
</template>
