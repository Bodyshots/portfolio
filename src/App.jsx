import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import ScrollToHashElement from "@cascadia-code/scroll-to-hash-element";
import AnimatedRoutes from "./components/AnimatedRoutes";
import NavBar from "./components/NavBar";
import ScrollBreakpoint from "./components/ScrollBreakpoint";
import "./input.css";
import "./index.css";

const App = () => {
  return (
    <>
      <ScrollBreakpoint />
      <ScrollToHashElement />
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
      <div id="footer_container">
        <p id="footer">
          Copyright © 2026 Lanz Angeles. Musketeer icon created by Flat Icons -
          Flaticon.
          <br />
          All other rights reserved.
        </p>
      </div>
    </>
  );
};

export default App;
