import { useEffect } from "react";

const useScrollToTop = (dependency) => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [dependency]);
};

export default useScrollToTop;
