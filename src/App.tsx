import { MotionConfig } from "framer-motion";
import { BrowserRouter as Router } from "react-router-dom";
import Footer from "./features/global/Footer";
import NavBar from "./features/global/NavBar";
import ScrollBreakpoint from "./features/global/ScrollBreakpoint";
import "./globals.css";
import { ThemeProvider } from "@teispace/next-themes/client";
import { lazy } from "react";
import { Route, Routes } from "react-router-dom";
import ThemeSwitcher from "./features/global/ThemeSwitcher";

const AllProjects = lazy(() => import("@/pages/AllProjects"));
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const Project = lazy(() => import("@/pages/Project"));

const App = () => {
  return (
    <MotionConfig reducedMotion="user">
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Router>
          <ScrollBreakpoint />
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/allprojects" element={<AllProjects />} />
            <Route path="/project/:projectName" element={<Project />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          <Footer />
        </Router>
        <ThemeSwitcher />
      </ThemeProvider>
    </MotionConfig>
  );
};

export default App;
