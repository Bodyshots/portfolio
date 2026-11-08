import { useNavigate } from "react-router-dom";
import { HomeSectionID } from "@/constants/home";
import ProjectCarousel from "@/features/project/ProjectCarousel";
import SectionHeader from "../SectionHeader";

const AllProjectsBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      className="-mt-6 mb-8 w-[11.5%] self-center rounded-lg bg-secondary-foreground p-2 text-lg text-primary shadow-sm transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-accent hover:text-primary-foreground hover:shadow-[-1px_-1px_1px_rgba(0,0,0,0.5)] max-lg:w-3/10 max-lg:p-0.5"
      onClick={() => navigate("/allprojects")}
      type="button"
    >
      <span className="flex text-center justify-center align-center">
        View all projects
      </span>
    </button>
  );
};

const HomeProjects = () => {
  return (
    <>
      <SectionHeader text="Major Projects" id={HomeSectionID.PROJECTS} />
      <div className="flex flex-col justify-center align-center bg-[linear-gradient(to_bottom,rgba(141,73,77,0.65)_-95%,transparent)]">
        <ProjectCarousel />
        <AllProjectsBtn />
      </div>
    </>
  );
};

export default HomeProjects;
