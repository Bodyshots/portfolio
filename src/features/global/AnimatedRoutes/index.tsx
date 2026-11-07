import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";
import AllProjects from "@/pages/AllProjects";
import Home from "@/pages/Home";
import NotFound from "@/pages/NotFound";
import Project from "@/pages/Project";

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="" element={<Home />} />
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/allprojects" element={<AllProjects />} />
        <Route path="/project/:projName" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
