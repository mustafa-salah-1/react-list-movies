
export default function Result({ movies }) {
  return (
    <div>
      <p>
        Movies <strong>{movies && movies.length} </strong>found
      </p>
    </div>
  );
}