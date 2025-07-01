import { useEffect, useState } from "react"; 
import ShowMovie from "./ShowMovie";
import Loader from "./Loader";
import Navbar from "./Navbar/Navbar";
import Search from "./Navbar/Search";
import Result from "./Navbar/Result";

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
function MovieList({ movies, handleShowMovie }) {
  return (
    <div className="list">
      {movies.map((movie) => (
        <ListItem
          key={movie.imdbID}
          movie={movie}
          handleShowMovie={handleShowMovie}
        />
      ))}
    </div>
  );
}
function ListItem({ movie, handleShowMovie }) {
  return (
    <div className="item" onClick={() => handleShowMovie(movie.imdbID)}>
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          src={movie.Poster}
          style={{ borderRadius: "5px" }}
          alt={movie.Title}
        />
        <div>
          <h3>{movie.Title}</h3>
          <p>{movie.Year}</p>
        </div>
      </div>
    </div>
  );
}
function WatchedSummary({ watched }) {
  function returnImdbRate() {
    return watched.reduce((sum, movie) => sum + Number(movie.rate), 0);
  }
  function returnMyRate() {
    return watched.reduce((sum, movie) => sum + Number(movie.myRate), 0);
  }
  function returnTime() {
    return watched.reduce((sum, movie) => sum + Number(movie.time), 0);
  }

  return (
    <div>
      <h3>Movies you watched</h3>
      <div>
        #️⃣ {watched.length} movies ⭐{returnImdbRate().toFixed(1)} 🌟{" "}
        {returnMyRate().toFixed(1)} ⌛{returnTime()} min
      </div>
    </div>
  );
}
function WatchedMoviesList({ watchedMovies, handleRemove }) {
  return (
    <div className="list">
      {watchedMovies &&
        watchedMovies.map((movie) => (
          <WatchedItem
            key={movie.id}
            handleRemove={handleRemove}
            movie={movie}
          />
        ))}
    </div>
  );
}
function WatchedItem({ movie, handleRemove }) {
  return (
    <div className="item">
      <div style={{ display: "flex", gap: "10px" }}>
        <img
          src={movie.poster}
          style={{ borderRadius: "5px" }}
          alt={movie.title}
        />
        <div>
          <h3>{movie.title}</h3>
          <p>
            {movie.year} ⭐ {movie.rate} 🌟 {movie.myRate} ⌛ {movie.time} min
          </p>
        </div>
      </div>
      <div>
        <button onClick={() => handleRemove(movie.id)}>&times;</button>
      </div>
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


