import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function ShowMovie({
  movieID,
  setError,
  handleWatchedMoive,
  isRate,
  handleShowMovie,
}) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [star, setStar] = useState();

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

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieById() {
        try {
          setIsLoading(true);
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=4b839182&i=${movieID}`,
            { signal: controller.signal }
          );

          if (!result.ok) throw new Error("fetch movies falied");

          const data = await result.json();

          if (data.Response === "False") throw new Error("movie not found!");
          setError("");
          setMovie(data);
        } catch (err) {
          if (err.name !== "AbortError") {
            setError(() => err.message);
          }
        } finally {
          setIsLoading(false);
        }
      }

      setStar(null);
      getMovieById();

      return function () {
        controller.abort();
      };
    },
    [movieID, setError]
  );

  useEffect(
    function () {
      if (!movie.Title) return;

      document.title = "Moive | " + movie.Title;

      return function () {
        document.title = "List Movies";
      };
    },
    [movie]
  );

  useEffect(
    function () {
      function callBack(e) {
        if (e.code === "Escape") {
          handleShowMovie(null);
        }
      }
      document.addEventListener("keydown", callBack);

      return function () {
        document.removeEventListener("keydown", callBack);
      };
    },
    [handleShowMovie]
  );

  return (
    <div>
      {isLoading ? (
        <Loader />
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
