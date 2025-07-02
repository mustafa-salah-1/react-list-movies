export default function WatchedSummary({ watched }) {
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
        #️⃣ {watched && watched.length} movies ⭐{returnImdbRate && returnImdbRate().toFixed(1)} 🌟{" "}
        {returnMyRate && returnMyRate().toFixed(1)} ⌛{returnTime && returnTime()} min
      </div>
    </div>
  );
}
