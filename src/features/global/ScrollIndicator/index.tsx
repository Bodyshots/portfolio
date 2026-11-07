import { useEffect, useState } from "react";

// Most code taken from https://www.youtube.com/watch?v=X1PI52QLanE
const ScrollIndicator = () => {
  const [scrollTop, setScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;

      setScrollTop((winScroll / height) * 100);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="h-1 bg-accent opacity-60 [transition:all_0.5s_ease-in-out,width_0s_ease-in-out]"
      style={{ width: `${scrollTop}%` }}
    />
  );
};

export default ScrollIndicator;
