import { MovieListSchema } from "../types/movie";

const BASE = "https://api.themoviedb.org/3";

async function request(path: string, params: Record<string, string> = {}) {
  const query = new URLSearchParams({ language: "ko-KR", ...params });
  const res = await fetch(`${BASE}${path}?${query}`, {
    headers: { Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}` },
  });
  if (!res.ok) throw new Error(`TMDB 요청 실패: ${res.status}`);
  return res.json();
}

export async function getPopular(page = 1) {
  const data = await request("/movie/popular", { page: String(page) });
  return MovieListSchema.parse(data);
}

export const searchMovies = (query: string, page = 1) =>
  request("/search/movie", { query, page: String(page) });

export const getMovie = (id: string) => request(`/movie/${id}`);

