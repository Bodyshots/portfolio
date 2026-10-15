import "./not_found.css";
import "../../components/globals.css";
import AOS from "aos";
import AnimatePage from "../../components/AnimatePage";
import "aos/dist/aos.css";
import { useEffect } from "react";
import { OtherConstants } from "../../constants/other";

function NotFound() {
  useEffect(() => {
    AOS.init({ duration: OtherConstants.AOS_DURATION });
  }, []);

  return (
    <AnimatePage>
      <div id="not_found_container">
        <h1 id="not_found_title">Page not found!</h1>
        <h4 id="not_found_subtitle">
          Hmmm... Are you sure you're supposed to be here?
        </h4>
      </div>
    </AnimatePage>
  );
}

export default NotFound;
