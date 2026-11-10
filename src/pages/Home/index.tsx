import { lazy, useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";
import "aos/dist/aos.css";
import { HomeContact } from "@/features/home/HomeContact";

const HomeHero = lazy(() => import("@/features/home/HomeHero"));
const HomeExperience = lazy(() => import("@/features/home/HomeExperience"));
const HomeProjects = lazy(() => import("@/features/home/HomeProjects"));
const HomeAbout = lazy(() => import("@/features/home/HomeAbout"));

const Home = () => {
  const { hash } = useLocation();

  useLayoutEffect(() => {
    if (!hash) return;

    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [hash]);

  return (
    <>
      <title>Home - Lanz Angeles</title>
      <div className="min-h-screen">
        <HomeHero />
        <HomeExperience />
        <HomeProjects />
        <HomeAbout />
        <HomeContact />
      </div>
    </>
  );
};

export default Home;
