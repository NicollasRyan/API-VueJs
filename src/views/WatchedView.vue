
<script setup lang="ts">
import { useWatchedStore } from '@/stores/watchedStore';

const watchedStore = useWatchedStore();
</script>

<template>
  <main class="container py-4">
    <h1 class="mb-4">Filmes assistidos</h1>

    <p v-if="watchedStore.watchedMovies.length === 0">
      Você ainda não registrou filmes assistidos.
    </p>

    <div v-else class="row g-4">
      <div
        v-for="record in watchedStore.watchedMovies"
        :key="record.movie.id"
        class="col-6 col-md-4 col-lg-3"
      >
        <div class="card h-100">
          <img
            v-if="record.movie.poster_path"
            :src="`https://image.tmdb.org/t/p/w500${record.movie.poster_path}`"
            :alt="record.movie.title"
            class="card-img-top"
          />

          <div class="card-body d-flex flex-column">
            <h5 class="card-title">
              {{ record.movie.title }}
            </h5>

            <p>
              Assistido {{ record.watchCount }}
              {{ record.watchCount === 1 ? 'vez' : 'vezes' }}
            </p>

            <p v-if="record.personalRating !== null">
              Minha nota: {{ record.personalRating }}/10
            </p>

            <RouterLink
              :to="`/movies/${record.movie.id}`"
              class="btn btn-primary mt-auto"
            >
              Ver detalhes
            </RouterLink>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
