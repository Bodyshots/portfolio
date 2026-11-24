import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoadingProjectCard from "@/features/global/Skeletons/LoadingProjectCard";
import ProjectCard from "@/features/project/ProjectCard";
import { createIds } from "@/lib/utils";
import { createProjectOptions } from "@/tanstack/queryFns/project";
import { type Project, ProjectQueryKey } from "@/types";

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
  } = useQuery(
    createProjectOptions<Project[]>({ key: ProjectQueryKey.PROJECTS }),
  );

  const open = (name: string) => {
    navigate(`/project/${encodeURIComponent(name.toLowerCase())}`);
  };

  return (
    <>
      <title>All Projects - Lanz Angeles</title>
      <main className="flex flex-col pt-24">
        <span className="text-5xl text-center text-foreground mb-4 max-xs:pt-8 wrap-break-word">
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
          <div className="mx-auto my-4 grid min-h-screen w-11/12 grid-cols-1 justify-center text-center md:grid-cols-2">
            {isPending ? (
              <div className="col-span-1 mx-auto grid w-full grid-cols-1 auto-rows-[20em] justify-items-center gap-x-2 gap-y-4 md:col-span-2 md:grid-cols-2 md:auto-rows-[22.5em]">
                {LOADING_PROJECT_IDS.map((id) => (
                  <LoadingProjectCard
                    key={id}
                    className="mt-2 w-15/16 max-md:mx-1 max-md:my-4"
                  />
                ))}
              </div>
            ) : (
              projects.map((project) => (
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
