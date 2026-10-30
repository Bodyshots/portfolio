import "./namechanger.css";
import "../globals.css";
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
    <div id="changer_container">
      <span className="subtitle text_highlight">hi, I'm</span>
      <span className="text_highlight" id="name">
        lanz,
      </span>
      <span className="subtitle text_highlight">{ROLES[currIndex]}</span>
    </div>
  );
}

export default NameChanger;
