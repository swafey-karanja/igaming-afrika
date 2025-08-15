import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    // Skip scroll to top on the first render (page reload/initial load)
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    // Only scroll to top on actual navigation
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
