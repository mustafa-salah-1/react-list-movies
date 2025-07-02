import { useEffect, useState } from "react";

const KEY = "4b839182";
export function useMovieId(movieID) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [star, setStar] = useState();
  const [error, setError] = useState();

  useEffect(
    function () {
      const controller = new AbortController();
      async function getMovieById() {
        try {
          setIsLoading(true);
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=${KEY}&i=${movieID}`,
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
    [movieID, setError, setMovie]
  );
  return [movie, isLoading, error, star, setStar];
}
