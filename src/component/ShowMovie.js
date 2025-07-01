import { useEffect, useState } from "react";
import StarRating from "./StarRating";
import Loader from "./Loader";

export default function ShowMovie({ movieID, handleWatchedMoive, isRate }) {
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
      async function getMovieById() {
        try {
          setIsLoading(true);
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=4b839182&i=${movieID}`
          );

          if (!result.ok) throw new Error("fetch movies falied");

          const data = await result.json();

          if (data.Response === "False") throw new Error("movie not found!");

          setMovie(data);
        } catch (err) {
          console.log(err.message);
        } finally {
          setIsLoading(false);
        }
      }

      setStar(null);
      getMovieById();
    },
    [movieID]
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
