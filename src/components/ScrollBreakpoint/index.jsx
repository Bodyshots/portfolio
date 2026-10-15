import { useEffect } from "react";
import { NavConstants } from "../../constants/navbar";
import { setNavOpaque, setNavTransparent } from "../../store/useUserStore";

const ScrollBreakpoint = () => {
  useEffect(() => {
    const scrollBreakpoint = NavConstants.FADE_BREAKPOINT;
    const updateScrollBreakpoint = () => {
      if (window.scrollY > scrollBreakpoint) setNavOpaque();
      else setNavTransparent();
    };

    updateScrollBreakpoint();
    window.addEventListener("scroll", updateScrollBreakpoint, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", updateScrollBreakpoint);
  }, []);

  return null;
};

export default ScrollBreakpoint;
