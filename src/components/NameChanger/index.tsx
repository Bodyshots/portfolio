import { useEffect, useState } from "react";
import { ROLES } from "@/constants/role";

function NameChanger() {
  const [currIndex, setCurrIndex] = useState(0);

  useEffect(() => {
    if (currIndex === ROLES.length - 1) {
      setCurrIndex(0);
    }
    const interval = setInterval(() => {
      const newRole = currIndex + 1;
      setCurrIndex(newRole);
    }, 2000);

    return () => clearInterval(interval);
  }, [currIndex]);

  return (
    <div className="flex flex-col gap-8">
      <span className="text_highlight text-[0.4em]">hi, I'm</span>
      <span className="text_highlight text-9xl">lanz,</span>
      <span className="text_highlight text-[0.4em]">{ROLES[currIndex]}</span>
    </div>
  );
}

export default NameChanger;
