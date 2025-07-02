import { useEffect, useState } from "react";

export function useLocalStorage(inisial,key) {
  const [value, setValue] = useState(function () {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : inisial;
  });

  useEffect(
    function () {
      localStorage.setItem(key, JSON.stringify(value));
    },
    [value, key]
  );

  return [value, setValue];
}
