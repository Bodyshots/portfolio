import './home.css';
import '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext, useState } from 'react';
import NameChanger from '../../components/NameChanger';
import supabase from '../../config/supabaseClient';
import ProjectCarousel from '../../components/ProjectCarousel';
import HoriScroll from '../../components/HoriScroll';
import Backdrop from '../../components/Backdrop';
import ProjectModal from '../../components/ProjectModal';
import { AnimatePresence } from 'framer-motion';
import HomeCoin from '../../components/HomeCoin';
import { useNavigate } from 'react-router-dom';

import { IoLogoLinkedin } from "react-icons/io";
import { IoLogoGithub } from "react-icons/io";
import { IoMdMail } from "react-icons/io";
import HomeCube from '../../components/HomeCube';

const Home = () => {

    let project_lst = [];
    const { loading, setLoading } = useContext(UserContext);
    const [fetchError, setFetchError] = useState(null);
    const [projects, setProjects] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(-1);
    const navigate = useNavigate();

    const open = (id) => {
        setIsActive(id);
        setModalOpen(true);
    }
    const close = () => setModalOpen(false);

    useEffect(() => {
        // Set to True to initialize everything
        setLoading(true);
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

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
    }, [loading]);

    for (let key in projects) {
        project_lst.push(projects[key]);
    }

    return (
        <AnimatePage>
            {fetchError && (<p>{fetchError}</p>)}
            <div className="home_page" id='home_page_container'>
                <title>Home Page</title>
                <div id='landing_sec'>
                    <div id='landing_overlay'>
                        <div id="landing_mid_container">
                            <span id="landing_cube" data-aos="fade-down"><HomeCube project_lst={project_lst} data-aos="fade-right" /></span>
                            <span data-aos="fade-left" id="landing_namechanger"><NameChanger /></span>
                        </div>
                    </div>
                </div>
                <div>
                    {HoriScroll(true, "Major Projects", "projects")}
                </div>
                <div id='projects'>
                    {ProjectCarousel(project_lst, modalOpen, open, close)}
                    <button id="all_proj_btn" onClick={() => navigate("/allprojects")}>
                        <span id="all_proj_text">View all projects</span>
                    </button>
                </div>
                {HoriScroll(false, "About", "about")}
                <div id='about'>
                    <div id="about_text">
                        <div id="about_texttitle">
                            Welcome to my website!
                        </div>
                        <div id="about_textbody">
                            <div>
                                Hi! I'm Lanz, an aspiring full-stack developer that's recently graduated with a Computer Science (CS) and Applied
                                Statistics major (and a minor in Mathematics)!
                                <br />
                                <br />I've previously worked as a Research Assistant, teaching hundreds of 1st and 2nd year students foundational skills to help them on their journey through CS.
                                Currently, I've been working on creating web applications while dabbling a little bit into AI, being eager to make my mark on the industry.
                                <br />
                                <br />
                                <div style={{
                                    display: "flex",
                                    textAlign: "center"
                                }}>
                                    Want to connect? Scroll down below to take a look at my socials. Hope to
                                    chat with you soon!
                                </div>
                            </div>
                        </div>
                    </div>
                    <span id="about_coin"><HomeCoin /></span>
                </div>
                {HoriScroll(true, "Contact", "contact")}
                <div id="contact">
                    <div id="contact_container">
                        <div id="contact_map">
                            <iframe id="google_maps"
                                src={import.meta.env.VITE_GOOGLEMAPS_URL}
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
                                            href={import.meta.env.VITE_GITHUB_URL}
                                            id="github_icon">
                                            <IoLogoGithub />
                                        </a>
                                        <a className="contact_link"
                                            href={import.meta.env.VITE_LINKEDIN_URL}
                                            id="linkedin_icon">
                                            <IoLogoLinkedin />
                                        </a>
                                        <a className="contact_link"
                                            href={import.meta.env.VITE_EMAIL}
                                            id="email_icon">
                                            <IoMdMail />
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
                                        id={isActive} />
                                </Backdrop>
                            </div>)}
                    </AnimatePresence>
                </div>
            </div>
        </AnimatePage>
    );
}

export default Home;

