import { useState } from "react";
import ShowMovie from "./ShowMovie";
import Loader from "./Loader";
import Navbar from "./Navbar/Navbar";
import Search from "./Navbar/Search";
import Result from "./Navbar/Result";
import MovieList from "./MovieList";
import WatchedMoviesList from "./WatchedMoviesList";
import WatchedSummary from "./WatchedSummary";
import { useMovie } from "./CustomHooks/useMovie";
import { useLocalStorage } from "./CustomHooks/useLocalStorage";

export default function App() {
  const [movieId, setMovieId] = useState(null);
  const [search, setSearch] = useState("");
  const [isRate, setIsRate] = useState(false);
  const [watched, setWatched] = useLocalStorage([], "watched");

  const { movies, isLoading, error } = useMovie(search);

  function handleShowMovie(movieId) {
    setMovieId(() => movieId);
    setIsRate(() =>
      Array.isArray(watched)
        ? watched.some((movie) => movie.id === movieId)
        : false
    );
  }

  function handleWatchedMoive(newWatched) {
    setWatched((watched) =>
      Array.isArray(watched) &&
      watched.some((movie) => movie.id === newWatched.id)
        ? watched
        : [...(Array.isArray(watched) ? watched : []), newWatched]
    );
    setMovieId(null);
  }

  return (
    <div className="app">
      <Navbar>
        <Search search={search} onEvent={setSearch} />
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
              isRate={isRate}
              movieID={movieId}
              handleWatchedMoive={handleWatchedMoive}
              handleShowMovie={handleShowMovie}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList
                handleRemove={setWatched}
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
