import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { HomeSectionID } from "@/constants/home";
import { ProjectConstants } from "@/constants/project";
import LoadingProjectCard from "@/features/global/Skeletons/LoadingProjectCard";
import ProjectCard from "@/features/project/ProjectCard";
import { createIds } from "@/lib/utils";
import { createProjectsOptions } from "@/tanstack/queryFns/projects";
import SectionHeader from "../SectionHeader";

const projectLimits = ProjectConstants.HOME;
const LOADING_PROJECT_IDS = createIds(
  projectLimits.MAX,
  "skeleton-project-card-",
);

const AllProjectsBtn = () => {
  const navigate = useNavigate();

  return (
    <button
      className="my-4 mb-8 w-[11.5%] self-center rounded-lg bg-secondary-foreground text-lg text-primary shadow-sm transition-all duration-100 ease-in-out hover:scale-105 hover:cursor-pointer hover:bg-accent hover:text-primary-foreground hover:shadow-[-1px_-1px_1px_color-mix(in_srgb,var(--foreground)_50%,transparent)] max-lg:w-3/10 max-lg:p-0.5 max-w-56.25"
      onClick={() => navigate("/allprojects")}
      type="button"
    >
      <span className="flex text-center justify-center align-center p-2">
        View more projects
      </span>
    </button>
  );
};

const HomeProjects = () => {
  const navigate = useNavigate();
  const {
    data: projects,
    isPending,
    error,
  } = useQuery(createProjectsOptions());
  const homeProjects = projects
    ? projects
        .filter((project) => project.major)
        .sort((a, b) => a.priority - b.priority)
        .slice(projectLimits.MIN, projectLimits.MAX)
    : [];
  const openProject = (name: string) => {
    navigate(`/project/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <>
      <SectionHeader text="Major Projects" id={HomeSectionID.PROJECTS} />
      <div className="flex flex-col justify-center align-center bg-[linear-gradient(to_bottom,color-mix(in_srgb,var(--accent)_65%,transparent)_-95%,transparent)] pt-4">
        {isPending ? (
          <div
            className="mx-auto mt-4 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 justify-items-center md:grid-cols-2"
            role="status"
            aria-label="Loading major projects"
          >
            {LOADING_PROJECT_IDS.map((id) => (
              <LoadingProjectCard key={id} />
            ))}
          </div>
        ) : error ? (
          <div className="my-12 text-center text-foreground">
            Hmmm... There are no projects here!
          </div>
        ) : (
          <div className="mx-auto mt-2 grid w-full max-w-6xl grid-cols-1 gap-6 px-4 justify-items-center md:grid-cols-2">
            {homeProjects.map((project) => (
              <ProjectCard
                key={project.id}
                item={project}
                open={openProject}
                className="m-0 w-full max-md:m-0"
              />
            ))}
          </div>
        )}
        <AllProjectsBtn />
      </div>
    </>
  );
};

export default HomeProjects;
