import "./home.css";
import AOS from "aos";
import { useEffect } from "react";
import AnimatePage from "@/components/AnimatePage";
import "aos/dist/aos.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeAbout from "@/components/HomeAbout";
import { HomeContact } from "@/components/HomeContact";
import HomeCube from "@/components/HomeCube";
import HomeExperience from "@/components/HomeExperience";
import NameChanger from "@/components/NameChanger";
import ProjectCarousel from "@/components/ProjectCarousel";
import SectionHeader from "@/components/SectionHeader";
import supabase from "@/config/supabaseClient";
import { OtherConstants } from "@/constants/other";

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
        <HomeAbout />
        <HomeExperience />
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
