
<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useWatchedStore } from '@/stores/watchedStore';
import type { Movie } from '@/types/movie';

const props = defineProps<{
  movie: Movie;
}>();

const genreNames: Record<number, string> = {
  28: 'Ação',
  12: 'Aventura',
  16: 'Animação',
  35: 'Comédia',
  18: 'Drama',
  27: 'Terror',
  878: 'Ficção científica',
};

const genres = computed(() =>
  (props.movie.genre_ids ?? [])
    .map((id) => genreNames[id])
    .filter(Boolean),
);

const watchedStore = useWatchedStore();

const isWatched = computed(() =>
  watchedStore.isWatched(props.movie.id),
);

const watchedRecord = computed(() =>
  watchedStore.watchedMovies.find(
    (record) => record.movie.id === props.movie.id,
  ),
);

const posterUrl = computed(() =>
  props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem',
);

function toggleWatched() {
  if (isWatched.value) {
    watchedStore.removeWatched(props.movie.id);
  } else {
    watchedStore.addWatched(props.movie);
  }
}
</script>

<template>
  <div class="card h-100 position-relative">
    <img
      :src="posterUrl"
      :alt="movie.title"
      class="card-img-top"
    />

    <div class="card-body d-flex flex-column">
      <h5 class="card-title">{{ movie.title }}</h5>

      <p class="card-text">
        Nota TMDB: {{ movie.vote_average.toFixed(1) }}
      </p>

      <p class="card-text text-truncate">
        {{ genres.join(', ') }}
      </p>

      <button
        type="button"
        class="btn position-absolute top-0 end-0 m-2"
        :class="isWatched ? 'btn-success' : 'btn-light'"
        :aria-label="isWatched ? 'Remover dos assistidos' : 'Marcar como assistido'"
        :aria-pressed="isWatched"
        @click="toggleWatched"
      >
        {{ isWatched ? '✓ Assistido' : '+ Assistido' }}
      </button>

      <p v-if="watchedRecord" class="small text-secondary">
        Assistido {{ watchedRecord.watchCount }}
        {{ watchedRecord.watchCount === 1 ? 'vez' : 'vezes' }}
      </p>

      <RouterLink
        :to="`/movies/${movie.id}`"
        class="btn btn-primary mt-auto"
      >
        Ver detalhes
      </RouterLink>
    </div>
  </div>
</template>
