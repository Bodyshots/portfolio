import AOS from "aos";
import { BrowserRouter as Router } from "react-router-dom";
import AllProjects from "@/pages/AllProjects";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Project from "@/pages/Project";
import Footer from "./features/global/Footer";
import NavBar from "./features/global/NavBar";
import ScrollBreakpoint from "./features/global/ScrollBreakpoint";
import "aos/dist/aos.css";
import "./globals.css";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { OtherConstants } from "./constants/other";
import { disableUserLoading, enableUserLoading } from "./store/useUserStore";

const App = () => {
  useEffect(() => {
    enableUserLoading();
    AOS.init({ duration: OtherConstants.AOS_DURATION });
    disableUserLoading();
  }, []);

  return (
    <Router>
      <ScrollBreakpoint />
      <NavBar />
      <Routes location={location} key={location.pathname}>
        <Route path="" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/project/:projectName" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
