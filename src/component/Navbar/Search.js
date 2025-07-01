export default function Search({ onEvent }) {
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