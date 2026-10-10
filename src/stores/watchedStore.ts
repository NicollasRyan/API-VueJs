
import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';
import type { WatchedMovie } from '@/types/watchedMovie';
import type { Movie } from '@/types/movie';

const STORAGE_KEY = 'movie-explorer-watched';

function loadWatchedMovies(): WatchedMovie[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);

    return stored ? (JSON.parse(stored) as WatchedMovie[]) : [];
  } catch {
    return [];
  }
}

export const useWatchedStore = defineStore('watched', () => {
  const watchedMovies = ref<WatchedMovie[]>(loadWatchedMovies());

  const totalWatchedMovies = computed(
    () => watchedMovies.value.length,
  );

  function isWatched(movieId: number): boolean {
    return watchedMovies.value.some(
      (item) => item.movie.id === movieId,
    );
  }

  function findRecord(movieId: number) {
    return watchedMovies.value.find(
      (item) => item.movie.id === movieId,
    );
  }

  function addWatched(movie: Movie): void {
    if (isWatched(movie.id)) return;

    watchedMovies.value.push({
      movie,
      watchCount: 1,
      personalRating: null,
      observation: '',
      watchedAt: new Date().toISOString(),
    });
  }

  function incrementWatchCount(movieId: number): void {
    const record = findRecord(movieId);
    if (record) record.watchCount++;
  }

  function decrementWatchCount(movieId: number): void {
    const record = findRecord(movieId);

    // A contagem nunca fica abaixo de 1.
    if (record && record.watchCount > 1) {
      record.watchCount--;
    }
  }

  function updateRating(
    movieId: number,
    rating: number | null,
  ): void {
    const record = findRecord(movieId);
    if (!record) return;

    if (
      rating !== null &&
      (!Number.isFinite(rating) || rating < 0 || rating > 10)
    ) {
      return;
    }

    record.personalRating = rating;
  }

  function updateObservation(
    movieId: number,
    observation: string,
  ): void {
    const record = findRecord(movieId);
    if (record) record.observation = observation;
  }

  function removeWatched(movieId: number): void {
    watchedMovies.value = watchedMovies.value.filter(
      (item) => item.movie.id !== movieId,
    );
  }

  watch(
    watchedMovies,
    (records) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(records));
    },
    { deep: true },
  );

  return {
    watchedMovies,
    totalWatchedMovies,
    isWatched,
    addWatched,
    incrementWatchCount,
    decrementWatchCount,
    updateRating,
    updateObservation,
    removeWatched,
  };
});
