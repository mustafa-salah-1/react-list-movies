import { useEffect } from "react";

export function useTitle(title) {
  useEffect(
    function () {
      if (!title) return;

      document.title = "Moive | " + title;

      return function () {
        document.title = "List Movies";
      };
    },
    [title]
  );
}
