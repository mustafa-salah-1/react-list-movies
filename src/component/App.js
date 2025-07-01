import { useEffect, useState } from "react";

export default function App() {
  const [movies, setMovies] = useState([]);
  // const [watched, setWatched] = useState([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
          {!isLoading && !error && movies && <MovieList movies={movies} />}
          {error && <ErrorMessage error={error} />}
        </Box>

        <Box>
          <WatchedSummary />
          <WatchedMoviesList />
        </Box>
      </Main>
    </div>
  );
}

function Main({ children }) {
  return <main>{children}</main>;
}
function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="movie">
      <div className="button">
        <button onClick={() => setIsOpen((isOpen) => !isOpen)}>
          {isOpen ? "-" : "+"}
        </button>
      </div>
      {isOpen && children}
    </div>
  );
}
function MovieList({ movies }) {
  return (
    <div className="list">
      {movies.map((movie) => (
        <ListItem key={movie.imdbID} movie={movie} />
      ))}
    </div>
  );
}
function ListItem({ movie }) {
  return (
    <div className="item">
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
function WatchedSummary() {
  return <div>summary</div>;
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
