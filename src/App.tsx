import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
// @ts-expect-error This package does not provide TypeScript declarations.
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import AnimatedRoutes from "./components/AnimatedRoutes";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import ScrollBreakpoint from "./components/ScrollBreakpoint";

const App = () => {
  return (
    <>
      <ScrollBreakpoint />
      <ScrollToHashElement />
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
      <Footer />
    </>
  );
};

export default App;
