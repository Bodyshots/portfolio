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

  // // TODO: loading
  // if (isPending) {
  //   return <div>loading...</div>;
  // }

  // // TODO: Error
  // if (error) {
  //   return (
  //     <>
  //     <title>Lanz Angeles</title>
  //       <div>Hmm... There's nothing here!</div>
  //     </>
  //   );
  // }[&>br]:hidden

  const sortedProjects = [...(projects ?? [])].sort(
    (a, b) => a.priority - b.priority,
  );

  return (
    <>
      <title>All Projects - Lanz Angeles</title>
      <main className="flex flex-col pt-24">
        <span className="text-5xl text-center text-foreground">
          All Projects
        </span>
        <div className="grid grid-cols-2 w-11/12 mx-auto my-4 min-h-dvh justify-center text-center">
          {isPending ? (
            <div className="col-span-2 mx-auto grid w-full grid-cols-2 auto-rows-[20em] justify-items-center gap-y-4 gap-x-2 md:auto-rows-[22.5em]">
              {LOADING_PROJECT_IDS.map((id) => (
                <LoadingProjectCard
                  key={id}
                  className="mt-2 w-15/16 max-md:mx-1 max-md:my-4"
                />
              ))}
            </div>
          ) : error ? (
            <div>
              <span>Hmm... There's nothing here!</span>
              <span>
                Cause: {error.cause ? String(error.cause) : "Unknown"}
              </span>
              <span>
                Please contact me about this error so I can get it fixed... :///
              </span>
            </div>
          ) : (
            sortedProjects.map((project) => (
              <ProjectCard key={project.id} item={project} open={open} />
            ))
          )}
        </div>
      </main>
    </>
  );
};

export default AllProjects;
