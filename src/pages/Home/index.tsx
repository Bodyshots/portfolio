import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import AnimatePage from "@/features/global/AnimatePage";
import "aos/dist/aos.css";
import HomeAbout from "@/features/home/HomeAbout";
import { HomeContact } from "@/features/home/HomeContact";
import HomeExperience from "@/features/home/HomeExperience";
import HomeHero from "@/features/home/HomeHero";
import HomeProjects from "@/features/home/HomeProjects";

const Home = () => {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <AnimatePage>
      <title>Lanz Angeles | Homepage</title>
      <div className="min-h-screen">
        <HomeHero />
        <HomeAbout />
        <HomeExperience />
        <HomeProjects />
        <HomeContact />
      </div>
    </AnimatePage>
  );
};

export default Home;
