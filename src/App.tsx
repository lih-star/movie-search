import { useEffect, useState } from "react";
import { getPopular } from "./api/tmdb";
import type { Movie } from "./types/movie";
import MovieCard from "./components/movieCard/movieCards";
import "./App.module.css";

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    getPopular()
      .then((data) => setMovies(data.results))
      .catch(console.error);
  }, []);
  
  return (
    <main className="container">
      <h1>인기 영화</h1>
      <div className="movie-grid">
        {movies.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
    </main>
  );
}

export default App;