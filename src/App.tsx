import { BrowserRouter as Router } from "react-router-dom";
import AnimatedRoutes from "@/features/global/AnimatedRoutes";
import Footer from "./features/global/Footer";
import NavBar from "./features/global/NavBar";
import ScrollBreakpoint from "./features/global/ScrollBreakpoint";
import "aos/dist/aos.css";
import "./globals.css";

const App = () => {
  return (
    <>
      <ScrollBreakpoint />
      <Router>
        <NavBar />
        <AnimatedRoutes />
      </Router>
      <Footer />
    </>
  );
};

export default App;
