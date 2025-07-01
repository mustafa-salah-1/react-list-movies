export default function MovieList({ movies, handleShowMovie }) {
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