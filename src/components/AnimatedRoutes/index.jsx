import { Route, Routes, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import AllProjects from '../../pages/AllProjects';
import Home from '../../pages/Home';
import Secret from '../../pages/Secret';
import NotFound from '../../pages/NotFound';
import MacGabriel100 from "../../pages/MacGabriel100"
import Project from '../../pages/Project';

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.pathname}>
                <Route exact path="" element={<Home />} />
                <Route exact path="/" element={<Home />} />
                <Route exact path="/home" element={<Home />} />
                <Route exact path="/macGabriel100" element={<MacGabriel100 />} />
                <Route exact path="/macgabriel100" element={<MacGabriel100 />} />
                <Route exact path="/allprojects" element={<AllProjects />} />
                <Route path="/proj/:projName" element={<Project />} />
                <Route exact path="/secret" element={<Secret />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;