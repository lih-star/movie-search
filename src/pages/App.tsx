import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPopular } from "../api/tmdb";
import type { Movie } from "../types/movie";
import MovieCard from "../components/movieCard/movieCards";
import SearchBar from "../components/searchBar/searchBar";
import styles from "./App.module.css";

function App() {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopular()
      .then((data) => setMovies(data.results))
      .catch(console.error);
  }, []);

  return (
    <main className={styles.container}>
      <h1>인기 영화</h1>
      <SearchBar
        onSearch={(q) => q && navigate(`/search?q=${encodeURIComponent(q)}`)}
      />
      <div className={styles.movieGrid}>
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  );
}

export default App;