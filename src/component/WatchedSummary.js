export default function WatchedSummary({ watched }) {
  function returnImdbRate() {
    if (!watched || watched.length === 0) {
      return 0;
    }
    return watched.reduce((sum, movie) => sum + Number(movie.rate), 0);
  }
  function returnMyRate() {
    if (!watched || watched.length === 0) {
      return 0;
    }
    return watched.reduce((sum, movie) => sum + Number(movie.myRate), 0);
  }
  function returnTime() {
    if (!watched || watched.length === 0) {
      return 0;
    }
    return watched.reduce((sum, movie) => sum + Number(movie.time), 0);
  }

  return (
    <div>
      <h3>Movies you watched</h3>
      <div>
        #️⃣ {watched && watched.length} movies ⭐{returnImdbRate().toFixed(1)} 🌟{" "}
        {returnMyRate().toFixed(1)} ⌛{returnTime()} min
      </div>
    </div>
  );
}
