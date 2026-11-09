import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ProjectCard from "@/features/project/ProjectCard";
import { createProjectsOptions } from "@/tanstack/queryFns/projects";

const AllProjects = () => {
  const navigate = useNavigate();
  const {
    data: projects,
    isPending,
    error,
  } = useQuery(createProjectsOptions());

  const open = (name: string) => {
    navigate(`/project/${encodeURIComponent(name.toLowerCase())}`);
  };

  // TODO: loading
  if (isPending) {
    return <div>loading...</div>;
  }

  // TODO: Error
  if (error) {
    return <div>Hmm... There's nothing here!</div>;
  }

  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <div className="grid grid-cols-2 w-9/10 mx-auto mb-4 min-h-dvh justify-center text-center items-center pt-16">
      {sortedProjects.map((project) => (
        <ProjectCard key={project.id} item={project} open={open} />
      ))}
    </div>
  );
};

export default AllProjects;
