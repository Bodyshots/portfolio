import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { NavConstants } from "@/constants/navbar";
import { setNavOpaque, setNavTransparent } from "@/store/useUserStore";

const ScrollBreakpoint = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const scrollBreakpoint = NavConstants.FADE_BREAKPOINT;
    const updateScrollBreakpoint = () => {
      if (pathname !== "/" && pathname !== "/home") {
        setNavOpaque();
        return;
      }

      if (window.scrollY > scrollBreakpoint) setNavOpaque();
      else setNavTransparent();
    };

    updateScrollBreakpoint();
    window.addEventListener("scroll", updateScrollBreakpoint, {
      passive: true,
    });

    return () => window.removeEventListener("scroll", updateScrollBreakpoint);
  }, [pathname]);

  return null;
};

export default ScrollBreakpoint;
