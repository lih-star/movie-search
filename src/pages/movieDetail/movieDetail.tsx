import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getMovie } from "../../api/tmdb";
import type { MovieDetail as MovieDetailType } from "../../types/movie";
import styles from "./MovieDetail.module.css";

export default function MovieDetail() {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<MovieDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);

    getMovie(id)
      .then(setMovie)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className={styles.message}>불러오는 중...</p>;
  if (error) return <p className={styles.message}>오류: {error}</p>;
  if (!movie) return null;

  return (
    <main className={styles.container}>
      <Link to="/" className={styles.back}>← 목록으로</Link>

      <div className={styles.content}>
        {movie.poster_path ? (
          <img
            className={styles.poster}
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
        ) : (
          <div className={styles.noPoster}>이미지 없음</div>
        )}

        <div className={styles.info}>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

          <p className={styles.meta}>
            {movie.release_date} · {movie.runtime ?? "-"}분 · ⭐{" "}
            {movie.vote_average.toFixed(1)}
          </p>

          <ul className={styles.genres}>
            {movie.genres.map((g) => (
              <li key={g.id}>{g.name}</li>
            ))}
          </ul>

          <h2>줄거리</h2>
          <p>{movie.overview || "줄거리 정보가 없습니다."}</p>
        </div>
      </div>
    </main>
  );
}