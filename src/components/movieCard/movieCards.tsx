import type { Movie } from "../../types/movie"
import "./movieCards.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const year = movie.release_date?.slice(0, 4);

  return (
    <article className="movie-card">
      {movie.poster_path ? (
        <img
          className="movie-card__poster"
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--empty">
          이미지 없음
        </div>
      )}

      <div className="movie-card__info">
        <h3 className="movie-card__title">{movie.title}</h3>
        <p className="movie-card__meta">
          ⭐ {movie.vote_average.toFixed(1)}
          {year && ` · ${year}`}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;