import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { useEffect, useState } from "react";
import { ROLES } from "@/constants/role";

function NameChanger() {
  const [currIndex, setCurrIndex] = useState(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setCurrIndex((index) => (index + 1) % ROLES.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [prefersReducedMotion]);

  return (
    <div className="flex flex-col gap-8 max-md:gap-4 max-sm:gap-2">
      <span className="text_highlight text-4xl max-sm:text-lg max-xs:text-base">
        Hi, I'm
      </span>
      <span className="text_highlight text-9xl max-sm:text-6xl max-xs:text-4xl">
        Lanz,
      </span>
      <span className="text_highlight text-4xl max-sm:text-lg max-xs:text-base">
        {ROLES[currIndex]}
      </span>
    </div>
  );
}

export default NameChanger;
