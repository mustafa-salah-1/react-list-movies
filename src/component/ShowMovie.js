import StarRating from "./StarRating";
import Loader from "./Loader";
import { useKey } from "./CustomHooks/useKey";
import { useTitle } from "./CustomHooks/useTitle";
import { useMovieId } from "./CustomHooks/useMovieId";

export default function ShowMovie({
  movieID,
  handleWatchedMoive,
  isRate,
  handleShowMovie,
}) {
  const [movie, isLoading, error, star, setStar] = useMovieId(movieID);

  function handleAddMovieToList() {
    handleWatchedMoive({
      id: movie.imdbID,
      title: movie.Title,
      poster: movie.Poster,
      time: movie.Runtime.replace(" min", ""),
      year: movie.Year,
      rate: movie.imdbRating,
      myRate: star,
    });
  }

  function handleClickStar(star) {
    setStar(() => star);
  }

  useTitle(movie.Title);
  useKey("Escape", handleShowMovie);

  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : error ? (
        error
      ) : (
        <>
          <div style={{ display: "flex", gap: "5px" }}>
            <img
              src={movie.Poster}
              style={{ borderRadius: "10px", width: "170px" }}
              alt={movie.Title}
            />
            <div>
              <h3>{movie.Title}</h3>
              <p>
                {movie.Released} | {movie.Runtime}
              </p>
              <p>{movie.Genre}</p>
              <p>⭐ {movie.imdbRating}</p>
            </div>
          </div>
          <div style={{ marginBlock: "20px" }}>
            {!isRate ? (
              <>
                <StarRating
                  defaultRate={movie.imdbRating}
                  starLength={10}
                  onClick={handleClickStar}
                />
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  {star && (
                    <button
                      onClick={handleAddMovieToList}
                      style={{
                        fontSize: "14px",
                        backgroundColor: "yellow",
                        color: "black",
                        width: "auto",
                        padding: "15px",
                        borderRadius: "10px",
                      }}
                    >
                      + add to watched list
                    </button>
                  )}
                </div>
              </>
            ) : (
              <h3
                style={{
                  backgroundColor: "#1a1a1d",
                  paddingBlock: "5px",
                  borderRadius: "10px",
                  textAlign: "center",
                  fontWeight: "600",
                }}
              >
                You rated this movie
              </h3>
            )}
          </div>
          <div
            style={{
              backgroundColor: "#1a1a1d",
              padding: "10px",
              borderRadius: "10px",
            }}
          >
            {movie.Plot}
          </div>
        </>
      )}
    </div>
  );
}
