import { useRef } from "react";
import { useKey } from "../CustomHooks/useKey";

export default function Search({ search, onEvent }) {
  const inputEl = useRef(null);

  useKey("Enter", function () {
    onEvent("");
    inputEl.current.focus();
  }); 

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
