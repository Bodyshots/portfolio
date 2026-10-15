import "./home.css";
import "../../components/globals.css";
import AOS from "aos";
import { useEffect } from "react";
import AnimatePage from "../../components/AnimatePage";
import "aos/dist/aos.css";
import { useState } from "react";
import { IoLogoGithub, IoLogoLinkedin, IoMdMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import HomeCoin from "../../components/HomeCoin";
import HomeCube from "../../components/HomeCube";
import HoriScroll from "../../components/HoriScroll";
import NameChanger from "../../components/NameChanger";
import ProjectCarousel from "../../components/ProjectCarousel";
import WorkHistory from "../../components/WorkHistory";
import supabase from "../../config/supabaseClient";
import { OtherConstants } from "../../constants/other";

const Home = () => {
  const project_lst = [];
  const [projects, setProjects] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProjects = async () => {
      // Get database from supabase - Has to be its exact name
      const { data, error } = await supabase.from("Projects").select();

      if (error) {
        setProjects(null);
        console.error(error);
      }

      if (data) {
        setProjects(data);
      }
    };

    // Initialize animation library
    AOS.init({ duration: OtherConstants.AOS_DURATION });

    fetchProjects(); // Get projects from database

    document.title = "Lanz Angeles | Homepage";
  }, []);

  for (const key in projects) {
    project_lst.push(projects[key]);
  }

  return (
    <AnimatePage>
      <div className="home_page" id="home_page_container">
        <title>Home Page</title>
        <div id="landing_sec">
          <div id="landing_overlay">
            <div id="landing_mid_container">
              <span id="landing_cube" data-aos="fade-down">
                <HomeCube data-aos="fade-right" />
              </span>
              <span data-aos="fade-left" id="landing_namechanger">
                <NameChanger />
              </span>
            </div>
          </div>
        </div>
        {HoriScroll(true, "About", "about")}
        <div id="about">
          <div id="about_text">
            <div id="about_texttitle">Welcome to my website!</div>
            <div id="about_textbody">
              <div>
                Hi! I'm Lanz, a full-stack developer that's recently graduated
                with a Computer Science (CS) and Applied Statistics major (and a
                minor in Mathematics)!
                <br />
                <br />
                I've previously worked as a Research Assistant, teaching
                hundreds of 1st and 2nd year students foundational skills to
                help them on their journey through CS. Currently, I've been
                working on creating web applications while dabbling a little bit
                into AI, being eager to make my mark on the industry.
                <br />
                <br />
                <div
                  style={{
                    display: "flex",
                    textAlign: "center",
                  }}
                >
                  Want to connect? Scroll down below to take a look at my
                  socials. Hope to chat with you soon!
                </div>
              </div>
            </div>
          </div>
          <span id="about_coin">
            <HomeCoin />
          </span>
        </div>
        {HoriScroll(false, "Experience", "experience")}
        <div id="experience">
          <WorkHistory />
        </div>
        <div>{HoriScroll(true, "Major Projects", "projects")}</div>
        <div id="projects">
          {ProjectCarousel(project_lst)}
          <button
            id="all_proj_btn"
            onClick={() => navigate("/allprojects")}
            type="button"
          >
            <span id="all_proj_text">View all projects</span>
          </button>
        </div>
        {HoriScroll(false, "Contact", "contact")}
        <div id="contact">
          <div id="contact_container">
            <div id="contact_map">
              <iframe
                id="google_maps"
                title="google_maps"
                src={import.meta.env.VITE_GOOGLEMAPS_URL}
                width="600px"
                height="250px"
                styles={"border:0;"}
                allowfullscreen=""
                loading="lazy"
                referrerpolicy="no-referrer-when-downgrade"
              ></iframe>
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
                    <a
                      className="contact_link"
                      href={import.meta.env.VITE_GITHUB_URL}
                      id="github_icon"
                    >
                      <IoLogoGithub />
                    </a>
                    <a
                      className="contact_link"
                      href={import.meta.env.VITE_LINKEDIN_URL}
                      id="linkedin_icon"
                    >
                      <IoLogoLinkedin />
                    </a>
                    <a
                      className="contact_link"
                      href={import.meta.env.VITE_EMAIL}
                      id="email_icon"
                    >
                      <IoMdMail />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AnimatePage>
  );
};

export default Home;
