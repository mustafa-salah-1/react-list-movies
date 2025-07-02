export default function WatchedMoviesList({ watchedMovies, handleRemove }) {
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
        <button
          onClick={() =>
            handleRemove((watched) =>
              watched.filter((item) => item.id !== movie.id)
            )
          }
        >
          &times;
        </button>
      </div>
    </div>
  );
}
