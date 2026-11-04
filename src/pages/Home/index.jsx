import "./home.css";
import AOS from "aos";
import { useEffect } from "react";
import AnimatePage from "@/components/AnimatePage";
import "aos/dist/aos.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeCoin from "@/components/HomeCoin";
import { HomeContact } from "@/components/HomeContact";
import HomeCube from "@/components/HomeCube";
import NameChanger from "@/components/NameChanger";
import ProjectCarousel from "@/components/ProjectCarousel";
import SectionHeader from "@/components/SectionHeader";
import WorkHistory from "@/components/WorkHistory";
import { OtherConstants } from "@/constants/other";
import supabase from "../../config/supabaseClient";

const Home = () => {
  const project_lst = [];
  const [projects, setProjects] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProjects = async () => {
      // Get database from supabase - Has to be its exact name
      const { data, error } = await supabase
        .from(import.meta.env.VITE_PROJECT_DB_NAME)
        .select();

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
        <SectionHeader text="About" />
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
        <SectionHeader text="Experience" />
        <div id="experience">
          <WorkHistory />
        </div>
        <SectionHeader text="Major Projects" />
        <div id="projects">
          {ProjectCarousel(project_lst)}
          <button
            className="mt-[-1.5em] mb-8 w-[11.5%] rounded-lg bg-secondary-foreground p-2 text-lg text-primary font-[PixelFont] shadow-sm transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-accent hover:text-primary-foreground hover:shadow-[-1px_-1px_1px_rgba(0,0,0,0.5)] max-[991px]:w-[30.5%] max-[991px]:p-[0.1em]"
            onClick={() => navigate("/allprojects")}
            type="button"
          >
            <span className="p-4 text-center justify-center align-center">
              View all projects
            </span>
          </button>
        </div>
        <HomeContact />
      </div>
    </AnimatePage>
  );
};

export default Home;
