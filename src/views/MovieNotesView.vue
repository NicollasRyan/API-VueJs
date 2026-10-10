
<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useWatchedStore } from '@/stores/watchedStore';

const route = useRoute();
const router = useRouter();
const watchedStore = useWatchedStore();

const movieId = computed(() => Number(route.params.id));

const record = computed(() =>
  watchedStore.watchedMovies.find(
    (item) => item.movie.id === movieId.value,
  ),
);

const rating = ref<number | ''>('');
const observation = ref('');

watch(
  record,
  (current) => {
    rating.value = current?.personalRating ?? '';
    observation.value = current?.observation ?? '';
  },
  { immediate: true },
);

function saveNotes() {
  if (!record.value) return;

  const parsedRating = rating.value === '' ? null : Number(rating.value);

  if (
    parsedRating !== null &&
    (!Number.isFinite(parsedRating) ||
      parsedRating < 0 ||
      parsedRating > 10)
  ) {
    return;
  }

  watchedStore.updateRating(movieId.value, parsedRating);
  watchedStore.updateObservation(movieId.value, observation.value);

  router.push(`/movies/${movieId.value}`);
}
</script>

<template>
  <main class="container py-4">
    <template v-if="record">
      <h1 class="mb-2">Minha avaliação</h1>
      <h2 class="h5 text-secondary mb-4">
        {{ record.movie.title }}
      </h2>

      <form @submit.prevent="saveNotes">
        <div class="mb-4">
          <label for="rating" class="form-label">
            Minha nota (0 a 10)
          </label>

          <input
            id="rating"
            v-model.number="rating"
            type="number"
            class="form-control"
            min="0"
            max="10"
            step="0.1"
            placeholder="Ex.: 8.5"
          />
        </div>

        <div class="mb-4">
          <label for="observation" class="form-label">
            Observação
          </label>

          <textarea
            id="observation"
            v-model="observation"
            class="form-control"
            rows="6"
            placeholder="O que achei desse filme?"
          />
        </div>

        <button type="submit" class="btn btn-primary">
          Salvar alterações
        </button>

        <RouterLink
          :to="`/movies/${movieId}`"
          class="btn btn-outline-secondary ms-2"
        >
          Cancelar
        </RouterLink>
      </form>
    </template>

    <div v-else>
      <p>Este filme não está registrado como assistido.</p>

      <RouterLink to="/watched" class="btn btn-outline-primary">
        Voltar aos assistidos
      </RouterLink>
    </div>
  </main>
</template>
