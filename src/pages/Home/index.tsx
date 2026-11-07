import AOS from "aos";
import { useEffect, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatePage from "@/features/global/AnimatePage";
import "aos/dist/aos.css";
import { useState } from "react";
import supabase from "@/config/supabaseClient";
import { OtherConstants } from "@/constants/other";
import HomeAbout from "@/features/home/HomeAbout";
import { HomeContact } from "@/features/home/HomeContact";
import HomeExperience from "@/features/home/HomeExperience";
import HomeHero from "@/features/home/HomeHero";
import HomeProjects from "@/features/home/HomeProjects";
import type { Project } from "@/types";

const Home = () => {
  const { hash } = useLocation();
  const [projects, setProjects] = useState<Project[]>([]);

  useLayoutEffect(() => {
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  useEffect(() => {
    const fetchProjects = async () => {
      // Get database from supabase
      const { data, error } = await supabase
        .from(import.meta.env.VITE_PROJECT_DB_NAME)
        .select();

      if (error) {
        setProjects([]);
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

  return (
    <AnimatePage>
      <title>Home Page</title>
      <div className="min-h-screen">
        <HomeHero />
        <HomeAbout />
        <HomeExperience />
        <HomeProjects projects={projects} />
        <HomeContact />
      </div>
    </AnimatePage>
  );
};

export default Home;
