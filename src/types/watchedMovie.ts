import type { Movie } from "./movie";

export interface WatchedMovie {
  movie: Movie;
  watchCount: number;
  personalRating: number | null;
  observation: string;
  watchedAt: string;
}