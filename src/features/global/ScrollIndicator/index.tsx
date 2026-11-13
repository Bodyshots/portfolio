import { useEffect, useRef } from "react";

// Most code taken from https://www.youtube.com/watch?v=X1PI52QLanE
const ScrollIndicator = () => {
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number | null = null;
    const updateProgress = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress =
        height > 0 ? Math.min((winScroll / height) * 100, 100) : 0;

      if (progressRef.current) {
        progressRef.current.style.width = `${progress}%`;
      }
    };

    const handleScroll = () => {
      if (frameId !== null) return;

      frameId = window.requestAnimationFrame(() => {
        frameId = null;
        updateProgress();
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (frameId !== null) window.cancelAnimationFrame(frameId);
    };
  }, []);

  return (
    <div
      ref={progressRef}
      className="h-1 bg-accent opacity-60 transition-colors duration-100"
    />
  );
};

export default ScrollIndicator;
