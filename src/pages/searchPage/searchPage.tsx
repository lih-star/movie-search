import { useEffect, useState } from "react";
import { useNavigate, useSearchParams, Link } from "react-router-dom";
import { searchMovies } from "../../api/tmdb";
import type { Movie } from "../../types/movie";
import MovieCard from "../../components/movieCard/movieCards";
import SearchBar from "../../components/searchBar/searchBar";
import styles from "../App.module.css";

export default function SearchPage() {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const q = searchParams.get("q") ?? "";

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!q) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    searchMovies(q, 1, controller.signal)
      .then((data) => setMovies(data.results))
      .catch((e) => {
        if (e.name === "AbortError") return;
        setError(e.message);
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [q]);

  const handleSearch = (next: string) => {
    if (!next) navigate("/");
    else setSearchParams({ q: next });
  };

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.back}>← 목록으로</Link>
      <h1>"{q}" 검색 결과</h1>
      <SearchBar key={q} defaultValue={q} onSearch={handleSearch} />

      {error && <p>오류: {error}</p>}
      {loading && <p>불러오는 중...</p>}
      {!loading && !error && movies.length === 0 && (
        <p>검색 결과가 없습니다.</p>
      )}

      <div className={styles.movieGrid}>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  );
}