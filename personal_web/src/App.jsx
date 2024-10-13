import React, { useEffect, createContext } from 'react'
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Container from 'react-bootstrap/Container';
import AnimatedRoutes from './components/AnimatedRoutes';
import { useState } from 'react';
import LoadingComp from './components/Loading';
import ErrorPopup from './components/ErrorPopup';
import SuccessPopup from './components/SuccessPopup';
import ScrollIndicator from './components/ScrollIndicator';

export const UserContext = createContext(null);

const App = () => {
    const [loading, setLoading] = useState(true);
    const [pageLoading, setPageLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const userStates = {
        loading: loading,
        setLoading: setLoading,
        pageLoading: pageLoading,
        setPageLoading: setPageLoading,
        error: error,
        setError: setError,
        success: success,
        setSuccess: setSuccess,
    }

    useEffect(() => {
      setPageLoading(false);
  }, [loading, pageLoading]);

    return (
        <>
        {/* <link
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css"
            rel="stylesheet"
            integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD"
            crossOrigin="anonymous"
        /> */}
        <link 
            href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" 
            rel="stylesheet"
            integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC"
            crossorigin="anonymous"
        />
            <Router>
            <UserContext.Provider value={userStates}>
              <NavBar />
              <AnimatedRoutes />
            </UserContext.Provider>
            </Router>
            {loading && <LoadingComp/>}
            {error && ErrorPopup(error, setError)}
            {success && SuccessPopup(success, setSuccess)}
            <Container id='footer_container'>
                <p id='footer'>  
                    Copyright © 2024 Lanz Angeles. All Rights Reserved.
                </p>  
            </Container>
        </>
    );
}

export default App;
