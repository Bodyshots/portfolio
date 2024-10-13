import './macgabriel100.css';
import '../../components/globals.css';
import AboutUs from '../../components/AboutUs';
// import Button from 'react-bootstrap/Button';
// import homepic from '../../images/homeimage.jpg';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext } from 'react';

const MacGabriel100 = () => {

    const { setLoading } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        AOS.init({ duration: 1000 });
        setLoading(false);
    }, [setLoading]);

    const projects_ref = useRef(null);
    const about_ref = useRef(null);
    const handleClick = (ref) => {
        ref.current?.scrollIntoView({behavior : 'smooth'});
    };

  return (
    <AnimatePage>
        <div id='home_page_container'>
            <title>Home Page</title>
            <div id='home_pic_sec'>
                <div id='homepic_container'>
                    <div id='homepic_overlay'>
                        <span data-aos="fade-down" id='text_home_overlay'>
                            <p id='hometextbox'>
                            easy chef<br />
                            <span id='text_home_subtitle'>
                                the ultimate destination for foodies, chefs,<br />
                                and good food
                            </span>
                            </p>
                            <a className='trans_back' id='aboutbtn' href="/home#about">More about us</a>
                        </span>
                        </div>
                    </div>
            </div>
            <div data-aos="fade-right" id='home_anecdote'>
                <p>
                <span id='home_quote_text'>"I have traveled the world, tasted the finest cuisines, 
                and yet I have never encountered such a remarkable collection of culinary ingenuity
                as I have found on easy chef."</span><br />
                <span id='home_quote_person'>- Renowned Chef and Restaurateur, Pierre Gagnaire</span>
                </p>
            </div>
            <div id='about'>
            <AboutUs/>
            </div>
        </div>
    </AnimatePage>
  );
}

export default MacGabriel100;

