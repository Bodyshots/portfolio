import AOS from "aos";
import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "@/features/global/AnimatedRoutes";
import Footer from "./features/global/Footer";
import NavBar from "./features/global/NavBar";
import ScrollBreakpoint from "./features/global/ScrollBreakpoint";
import "aos/dist/aos.css";
import "./globals.css";
import { useEffect } from "react";
import { OtherConstants } from "./constants/other";
import { disableUserLoading, enableUserLoading } from "./store/useUserStore";

const App = () => {
  useEffect(() => {
    enableUserLoading();
    AOS.init({ duration: OtherConstants.AOS_DURATION });
    disableUserLoading();
  });

  return (
    <Router>
      <ScrollBreakpoint />
      <NavBar />
      <AnimatedRoutes />
      <Footer />
    </Router>
  );
};

export default App;
