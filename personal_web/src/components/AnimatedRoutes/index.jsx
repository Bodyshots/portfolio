import React, { useContext } from 'react';
import { Route, Routes, useLocation} from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { UserContext } from '../../App';
import Home from '../../pages/Home';
import Secret from '../../pages/Secret';
import NotFound from '../../pages/NotFound';
import MacGabriel100 from "../../pages/MacGabriel100"
// import Loading from '../../pages/Loading';
import Test from '../../pages/Test';

// Idea of separating AnimatedRoutes from App.js from:
// https://www.youtube.com/watch?v=FdrEjwymzdY
function AnimatedRoutes() {
    const location = useLocation();
    // const { pageLoading } = useContext(UserContext);

    // if (pageLoading) {
    //     return <Loading />
    // }

    return (
        <AnimatePresence mode="wait" initial={ false }>
            <Routes location={location} key={location.pathname}>
                <Route exact path="" element={<Home/>}/>
                <Route exact path="/" element={<Home/>}/>
                <Route exact path="/home" element={<Home/>}/>
                <Route exact path="/macGabriel100" element={<MacGabriel100/>}/>
                <Route exact path="/macgabriel100" element={<MacGabriel100/>}/>
                <Route exact path="/secret" element={<Secret/>}/>
                <Route exact path="test" element={<Test/>}/>
                <Route path="*" element={<NotFound/>}/>
            </Routes>
        </AnimatePresence>
    );
}

export default AnimatedRoutes;