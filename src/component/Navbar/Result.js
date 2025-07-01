
export default function Result({ movies }) {
  return (
    <div>
      <p>
        Result <strong>{movies && movies.length}</strong>
      </p>
    </div>
  );
}