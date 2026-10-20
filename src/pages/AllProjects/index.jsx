import "./allprojects.css";
import "../../components/globals.css";
import AOS from "aos";
import { useEffect, useState } from "react";
import AnimatePage from "../../components/AnimatePage";
import "aos/dist/aos.css";
import { useNavigate } from "react-router-dom";
import ProjectCard from "../../components/ProjectCard";
import supabase from "../../config/supabaseClient";
import { OtherConstants } from "../../constants/other";
import { normTitleHTMLEscape } from "../../lib/utils";

const AllProjects = () => {
  const navigate = useNavigate();

  const project_lst = [];
  const [projects, setProjects] = useState(null);

  const open = (name) => {
    window.scrollTo({ top: 0, behavior: "instant" });
    navigate(
      `/project/${normTitleHTMLEscape(project_lst.find((p) => p.name === name).name)}`,
    );
  };

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });

    const fetchProjects = async () => {
      // Get database from supabase - Has to be its exact name
      const { data, error } = await supabase
        .from(import.meta.env.VITE_PROJECT_DB_NAME)
        .select();

      if (error) {
        setProjects(null);
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

  for (const key in projects) {
    project_lst.push(projects[key]);
  }

  return (
    <AnimatePage>
      <div id="all_projects_page">
        {project_lst
          .sort((a, b) => a.priority - b.priority)
          .map((project) => ProjectCard(project, open))}
      </div>
    </AnimatePage>
  );
};

export default AllProjects;
