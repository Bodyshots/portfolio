import AOS from "aos";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "@/config/supabaseClient";
import { OtherConstants } from "@/constants/other";
import AnimatePage from "@/features/global/AnimatePage";
import ProjectCard from "@/features/project/ProjectCard";
import { normTitleHTMLEscape } from "@/lib/utils";
import {
  disableProjectsLoading,
  enableProjectsLoading,
  setSelectedProject,
} from "@/store/useProjectStore";
import type { Project } from "@/types";

const AllProjects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState<Project[]>([]);

  const open = (pid: number, name: string) => {
    enableProjectsLoading();
    setSelectedProject(pid);
    disableProjectsLoading();

    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(`/project/${normTitleHTMLEscape(name)}`);
  };

  useEffect(() => {
    const fetchProjects = async () => {
      // Get database from supabase - Has to be its exact name
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

    AOS.init({ duration: OtherConstants.AOS_DURATION }); // Init animation library
    fetchProjects();

    document.title = "Lanz Angeles | All Projects";
  }, []);

  const sortedProjects = [...projects].sort((a, b) => a.priority - b.priority);

  return (
    <AnimatePage>
      <div className="grid grid-cols-2 w-9/10 mx-auto mb-4 min-h-dvh justify-center text-center items-center pt-16">
        {sortedProjects.map((project) => (
          <ProjectCard key={project.id} item={project} open={open} />
        ))}
      </div>
    </AnimatePage>
  );
};

export default AllProjects;
