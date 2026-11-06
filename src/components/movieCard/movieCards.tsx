import type { Movie } from "../../types/movie"
import styles from "./movieCards.module.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

type Props = {
  movie: Movie;
};

function MovieCard({ movie }: Props) {
  const year = movie.release_date?.slice(0, 4);

  return (
    <article className={styles.movieCard}>
      {movie.poster_path ? (
        <img
          className={styles.movieCardPoster}
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={`${movie.title} 포스터`}
          loading="lazy"
        />
      ) : (
        <div className={styles.movieCardPosterEmpty}>
          이미지 없음
        </div>
      )}

      <div className={styles.movieCardInfo}>
        <h3 className={styles.movieCardTitle}>{movie.title}</h3>
        <p className={styles.movieCardMeta}>
          ⭐ {movie.vote_average.toFixed(1)}
          {year && ` · ${year}`}
        </p>
      </div>
    </article>
  );
}

export default MovieCard;