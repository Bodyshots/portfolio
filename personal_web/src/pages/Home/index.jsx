import './home.css';
import '../../components/globals.css';
import AboutUs from '../../components/AboutUs';
// import Button from 'react-bootstrap/Button';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext } from 'react';
import HomeCube from '../../components/HomeCube';
import NameChanger from '../../components/NameChanger';

const Home = () => {

    const { setLoading } = useContext(UserContext);

    const projects_ref = useRef(null);
    const about_ref = useRef(null);
    const handleClick = (e) => {
        e.current?.scrollIntoView({behavior : 'smooth'});
    };

    useEffect(() => {
        setLoading(true);
        AOS.init({ duration: 1000 });
        document.title = "Lanz Angeles | Homepage";
        setLoading(false);
    }, [setLoading]);

  return (
    <AnimatePage>
        <div className="home_page" id='home_page_container'>
            <title>Home Page</title>
            <div id='landing_sec'>
                <div id='landing_container'>
                    <div id='landing_overlay'>
                        <div id='landing_text_overlay'>
                            <div id="landing_mid_container">
                                <span data-aos="fade-right" className="text_highlight" id='landing_text_left'>yo</span>
                                <span id="landing_cube" data-aos="fade-down"><HomeCube data-aos="fade-right"/></span>
                                <span data-aos="fade-left" id="landing_namechanger"><NameChanger/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="text-divider-sec">
                <div className="text-divider-scroll">
                    <div className="text-divider-scroll-item-right projects item1 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item2 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item3 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item4 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item5 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item6 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item7 text_shadow">Projects -</div>
                    <div className="text-divider-scroll-item-right projects item8 text_shadow">Projects -</div>
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
            <div className="text-divider-sec">
                <div className="text-divider-scroll">
                    <div className="text-divider-scroll-item-left about text_shadow item1">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item2">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item3">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item4">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item5">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item6">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item7">About -</div>
                    <div className="text-divider-scroll-item-left about text_shadow item8">About -</div>
                </div>
            </div>
            <div id='about'>
                <AboutUs/>
            </div>
            <div className="text-divider-sec">
                <div className="text-divider-scroll">
                    <div className="text-divider-scroll-item-right contact text_shadow item1">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item2">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item3">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item4">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item5">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item6">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item7">Contact -</div>
                    <div className="text-divider-scroll-item-right contact text_shadow item8">Contact -</div>
                </div>
            </div>
            <div id="contact_sec">
                <div id="contact_container">
                    <div id="contact_map"> {/* map maybe */}
                        test
                    </div>
                    <div id="contact_info_container"> {/*actual contact info*/}
                        <div id="contact_info"> {/*name, email, phone_num*/}
                            <span>Lanz Angeles</span>
                            <span>lanzangeles100@gmail.com</span>
                            <span>(226)-627-5219</span>
                            <div id="contact_links"> {/*links (icons)*/}
                                Links
                                <div id="link1"></div>
                                <div id="link2"></div>
                                <div id="link3"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AnimatePage>
  );
}

export default Home;

