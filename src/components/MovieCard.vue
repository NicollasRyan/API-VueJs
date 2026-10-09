<script setup lang="ts">
import { computed, defineProps } from 'vue';

const props = defineProps<{
  movie: {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    vote_average: number;
    genre_ids: number[];
  };
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
    .filter(Boolean)
);

const posterUrl = computed(() => {
  return props.movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${props.movie.poster_path}`
    : 'https://via.placeholder.com/500x750?text=Sem+Imagem';
});
</script>

<template>
    <div class="card h-100">
        <img
        :src="posterUrl"
        :alt="movie.title"
        class="card-img-top"
        />
    
        <div class="card-body d-flex flex-column">
        <h5 class="card-title">{{ movie.title }}</h5>
        <p  class="card-text">{{ movie.vote_average.toFixed(1) }}</p>
        <p class="card-text text-truncate">{{ genres.join(', ') }} </p>
    
        <router-link
            :to="`/movies/${movie.id}`"
            class="btn btn-primary mt-auto"
        >
            Ver detalhes
        </router-link>
        </div>
    </div>
</template>