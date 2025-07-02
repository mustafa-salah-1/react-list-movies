import { useEffect, useState } from "react";
import ShowMovie from "./ShowMovie";
import Loader from "./Loader";
import Navbar from "./Navbar/Navbar";
import Search from "./Navbar/Search";
import Result from "./Navbar/Result";
import MovieList from "./MovieList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRate, setIsRate] = useState(false);

  function handleShowMovie(movieId) {
    setMovieId(() => movieId);
    setIsRate(() => watched.some((movie) => movie.id === movieId));
  }

  function handleRemoveWatchedMovie(movieId) {
    setWatched((watched) => watched.filter((movie) => movie.id !== movieId));
  }

  function handleWatchedMoive(newWatched) {
    setWatched((watched) =>
      watched.some((movie) => movie.id === newWatched.id)
        ? watched
        : [...watched, newWatched]
    );
    setMovieId(null);
  }

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          setIsLoading(true);
          setError("");
          const result = await fetch(
            `https://www.omdbapi.com/?apikey=4b839182&s=${search}`
          );

          if (!result.ok) throw new Error("fetch movies falied");

          const data = await result.json();

          if (data.Response === "False") throw new Error("movie not found!");

          setMovies(data.Search);
        } catch (error) {
          setError(error.message);
        } finally {
          setIsLoading(false);
        }
      }

      if (search.length < 3) {
        setError("");
        setMovies([]);
        return;
      }

      fetchMovies();
    },
    [search]
  );

  return (
    <div className="app">
      <Navbar>
        <Search onEvent={setSearch} />
        <Result movies={movies} />
      </Navbar>

      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && movies && (
            <MovieList movies={movies} handleShowMovie={handleShowMovie} />
          )}
          {error && <ErrorMessage error={error} />}
        </Box>

        <Box movie={movieId} handleShowMovie={handleShowMovie}>
          {movieId ? (
            <ShowMovie
              setError={setError}
              isRate={isRate}
              movieID={movieId}
              handleWatchedMoive={handleWatchedMoive}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                handleRemove={handleRemoveWatchedMovie}
                watchedMovies={watched}
              />
            </>
          )}
        </Box>
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}
function Box({ children, movie = null, handleShowMovie = null }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie">
      <div className="button">
        <div>
          {movie && isOpen && (
            <button onClick={() => handleShowMovie(null)}>&larr;</button>
          )}
        </div>

        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? `x` : "+"}
        </button>
      </div>
      {isOpen && children}
    </div>
  );
}
function ErrorMessage({ error }) {
  return (
    <div style={{ padding: "5px", textAlign: "center", fontSize: "22px" }}>
      {error}
    </div>
  );
}
