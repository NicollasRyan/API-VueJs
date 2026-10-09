import type { Movie, MovieDetails } from "@/types/movie";

const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

console.log("Token:", TOKEN); // Adicione esta linha para verificar o valor do token

export async function getPopularMovies(): Promise<Movie[]> {
  const response = await fetch(
    `${BASE_URL}/movie/popular?language=pt-BR&page=1`,
    {
      headers: {
        Authorization: `Bearer ${TOKEN}`,
        Accept: "application/json",
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Erro ao buscar filmes: ${response.status}`);
  }

  const data: MovieResponse = await response.json();

  return data.results;
}

export async function getMovieDetails(movieId: number): Promise<MovieDetails> {
  const response = await fetch(`${BASE_URL}/movie/${movieId}?language=pt-BR`, {
    headers: { Authorization: `Bearer ${TOKEN}`, Accept: "application/json" },
  });
  if (!response.ok) {
    throw new Error(`Erro ao buscar detalhes do filme: ${response.status}`);
  }
  const data: MovieDetails = await response.json();
  return data;
}
