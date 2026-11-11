import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingProjectCard from "@/features/global/Skeletons/LoadingProjectCard";
import ProjectCard from "@/features/project/ProjectCard";
import { createIds } from "@/lib/utils";
import { createProjectsOptions } from "@/tanstack/queryFns/projects";

const LOADING_PROJECT_COUNT = 4;
const LOADING_PROJECT_IDS = createIds(
  LOADING_PROJECT_COUNT,
  "skeleton-project-card-",
);

const AllProjects = () => {
  useLayoutEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const navigate = useNavigate();
  const {
    data: projects,
    isPending,
    error,
  } = useQuery(createProjectsOptions());

  const open = (name: string) => {
    navigate(`/project/${encodeURIComponent(name.toLowerCase())}`);
  };

  const sortedProjects = [...(projects ?? [])].sort(
    (a, b) => a.priority - b.priority,
  );

  return (
    <>
      <title>All Projects - Lanz Angeles</title>
      <main className="flex flex-col pt-24">
        <span className="text-5xl text-center text-foreground mb-4">
          All Projects
        </span>
        {error ? (
          <div className="flex flex-col text-foreground justify-center min-h-screen text-center gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-5xl">Hmm... There's nothing here!</span>
              <span className="text-2xl">
                Cause: {error?.cause ? String(error.cause) : "Unknown"}
              </span>
            </div>
            <span className="text-xl">
              Please contact me about this error so I can get it fixed... :/
            </span>
          </div>
        ) : (
          <div className="grid grid-cols-2 w-11/12 mx-auto my-4 min-h-screen justify-center text-center">
            {isPending ? (
              <div className="col-span-2 mx-auto grid w-full grid-cols-2 auto-rows-[20em] justify-items-center gap-y-4 gap-x-2 md:auto-rows-[22.5em]">
                {LOADING_PROJECT_IDS.map((id) => (
                  <LoadingProjectCard
                    key={id}
                    className="mt-2 w-15/16 max-md:mx-1 max-md:my-4"
                  />
                ))}
              </div>
            ) : (
              sortedProjects.map((project) => (
                <ProjectCard key={project.id} item={project} open={open} />
              ))
            )}
          </div>
        )}
      </main>
    </>
  );
};

export default AllProjects;
