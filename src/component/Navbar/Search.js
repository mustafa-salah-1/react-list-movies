import { useEffect, useRef } from "react";

export default function Search({ search, onEvent }) {
  const inputEl = useRef(null);

  useEffect(function () {
    function callBack(e) {
      if (document.activeElement === inputEl.current) return;

      if (e.code === "Enter") {
        onEvent("");
        inputEl.current.focus();
      }
    }

    document.addEventListener("keydown", callBack);

    return () => document.addEventListener("keydown", callBack);
  }, []);

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => onEvent(() => e.target.value)}
        placeholder="Search..."
        ref={inputEl}
      />
    </div>
  );
}
