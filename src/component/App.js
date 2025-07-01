import { useEffect, useState } from "react";
import StarRating from "./StarRating";

export default function App() {
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [movieId, setMovieId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  function handleShowMovie(movieId) {
    setMovieId(() => movieId);
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
            <ShowMovie movieID={movieId} handleShowMovie={handleShowMovie} />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList />
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

function ShowMovie({ movieID }) {
  const [movie, setMovie] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [star, setStar] = useState();

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
              style={{ borderRadius: "10px" }}
              width={150}
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
            <StarRating
              defaultRate={movie.imdbRating}
              starLength={10}
              onClick={handleClickStar}
              // removeNumberStars={true}
            />
            <div style={{ display: "flex", justifyContent: "center" }}>
              {star && (
                <button
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
          </div>
        </>
      )}
    </div>
  );
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
          {isOpen ? "-" : "+"}
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
      <div>
        <img src={movie.Poster} width={55} alt={movie.Title} />
      </div>
      <div>
        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>
      </div>
    </div>
  );
}
function WatchedSummary({ watched }) {
  return (
    <div>
      <h3>Movies you watched</h3>
      <div>#️⃣ {watched.length} movies ⭐ 0 ⌛ 0 min</div>
    </div>
  );
}
function WatchedMoviesList() {
  return (
    <div className="list">
      <WatchedItem />
    </div>
  );
}
function WatchedItem() {
  return (
    <div className="item">
      <div>
        <img src="logo512.png" width={55} alt="test" />
      </div>
      <div>
        <h2>name</h2>
        <p>des</p>
      </div>
    </div>
  );
}

function Loader() {
  return (
    <div style={{ padding: "5px", textAlign: "center", fontSize: "22px" }}>
      Loading...
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

function Navbar({ children }) {
  return (
    <nav>
      <Logo /> {children}
    </nav>
  );
}
function Logo() {
  return (
    <div>
      <img src="logo192.png" width={35} alt="logo" />
      <span>Movies</span>
    </div>
  );
}

function Search({ onEvent }) {
  return (
    <div>
      <input
        type="text"
        onChange={(e) => onEvent(() => e.target.value)}
        placeholder="Search..."
      />
    </div>
  );
}

function Result({ movies }) {
  return (
    <div>
      <p>
        Result <strong>{movies && movies.length}</strong>
      </p>
    </div>
  );
}
