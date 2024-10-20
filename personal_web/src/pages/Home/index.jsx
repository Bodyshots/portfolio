import './home.css';
import '../../components/globals.css';
import AboutUs from '../../components/AboutUs';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import HomeCube from '../../components/HomeCube';
import NameChanger from '../../components/NameChanger';
import supabase from '../../config/supabaseClient';
import ProjectCarousel from '../../components/ProjectCarousel';
import HoriScroll from '../../components/HoriScroll';
import Backdrop from '../../components/Backdrop';
import ProjectModal from '../../components/ProjectModal';
import { AnimatePresence } from 'framer-motion';

import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { IoMdMail } from "react-icons/io";

const Home = () => {

    let project_lst = [];
    const { setLoading } = useContext(UserContext);
    const [fetchError, setFetchError] = useState(null);
    const [projects, setProjects] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(-1);
    
    const open = (id) => {
      setIsActive(id);
      setModalOpen(true);
    }
    const close = () => setModalOpen(false);

    useEffect(() => {
        // Set to True to initialize everything
        setLoading(true);

        const fetchProjects = async () => {
            // Get database from supabase
            // Has to be its exact name
            const { data, error } = await supabase
                .from('Projects')
                .select()

                if (error) {
                    setFetchError("Could not fetch projects");
                    setProjects(null);
                    console.log(error)
                }

                if (data) {
                    setProjects(data);
                    setFetchError(null);
                }
        }

        // Initialize animation library
        AOS.init({ duration: 1000 });
        // Get projects from database
        fetchProjects();
        // Set new title
        document.title = "Lanz Angeles | Homepage";
        
        // Everything's done (ie. done loading)
        setLoading(false);
    }, [setLoading]);

    for (let key in projects) {
        project_lst.push(projects[key]);
    }

  return (
    <AnimatePage>
        {fetchError && (<p>{fetchError}</p>)}
        <div className="home_page" id='home_page_container'>
            <title>Home Page</title>
            <div id='landing_sec'>
                <div id='landing_container'>
                    <div id='landing_overlay'>
                        <div id='landing_text_overlay'>
                            <div id="landing_mid_container">
                                <span id="landing_cube" data-aos="fade-down"><HomeCube data-aos="fade-right"/></span>
                                <span data-aos="fade-left" id="landing_namechanger"><NameChanger/></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {HoriScroll(true, "Major Projects", "projects")}
            <div id='projects'>
                {/* {console.log("project_lst: " + project_lst)}
                {console.log("project_dict: " + projects)} */}
                {ProjectCarousel(project_lst, modalOpen, open, close, isActive)}
                <button id="all_proj_btn">
                    <span id="all_proj_text">View all projects</span>
                </button>
            </div>
            {HoriScroll(false, "About", "about")}
            <div id='about'>
                <span>dighdsljsndfkfm</span>
                {/* <AboutUs/> */}
            </div>
            {HoriScroll(true, "Contact", "contact")}
            <div id="contact">
                <div id="contact_container">
                    <div id="contact_map">
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d369107.52433834237!2d-79.70700198668911!3d43.717769540554514!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d4cb90d7c63ba5%3A0x323555502ab4c477!2sToronto%2C%20ON!5e0!3m2!1sen!2sca!4v1729226408850!5m2!1sen!2sca"
                            width="600px"
                            height="250px"
                            styles={"border:0;"}
                            allowfullscreen=""
                            loading="lazy"
                            referrerpolicy="no-referrer-when-downgrade">   
                    </iframe>
                    </div>
                    <div id="contact_info_container">
                        <div id="contact_info">
                            <div id="personal_info">
                                <span>Lanz Angeles</span>
                                <span>lanzangeles100@gmail.com</span>
                                <span>226-627-5219</span>
                            </div>
                            <div id="contact_links">
                                <div id="contact_link_title">Links</div>
                                <div id="links">
                                    <a className="contact_link" 
                                       href={"https://github.com/Bodyshots"}
                                       id="github_icon">
                                        <IoLogoGithub/>
                                    </a>
                                    <a className="contact_link" 
                                       href={"https://www.linkedin.com/in/lanzangeles/"}
                                       id="linkedin_icon">
                                        <IoLogoLinkedin/>
                                    </a>
                                    <a className="contact_link"
                                       href={"mailto:lanzangeles100@gmail.com?subject=sup nerd"}
                                       id="email_icon">
                                        <IoMdMail/>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                >
                {modalOpen && 
                    (<div className="modal_container">
                        <Backdrop onClick={close}>
                            <ProjectModal handleClose={close} 
                                          project_lst={project_lst}
                                          id={isActive}/>
                        </Backdrop>
                    </div>)}
                </AnimatePresence>
            </div>
        </div>
    </AnimatePage>
  );
}

export default Home;

