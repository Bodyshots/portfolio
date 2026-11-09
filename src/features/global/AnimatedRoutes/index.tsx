import { AnimatePresence } from "framer-motion";
import { lazy } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

const AllProjects = lazy(() => import("@/pages/AllProjects"));
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Project = lazy(() => import("@/pages/Project"));

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
        <Route path="/project/:projectName" element={<Project />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

export default AnimatedRoutes;
