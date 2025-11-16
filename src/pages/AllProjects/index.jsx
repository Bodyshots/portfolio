import './allprojects.css';
import '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext } from 'react';
import ProjectCard from '../../components/ProjectCard';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';
import { normTitleHTMLEscape } from '../../lib/utils';

const AllProjects = ({ }) => {

  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  let project_lst = [];
  const [projects, setProjects] = useState(null);

  const open = (name) => {
    window.scrollTo({ top: 0, behavior: 'instant' })
    navigate(`/project/${normTitleHTMLEscape(project_lst.find(p => p.name === name).name)}`);
  }

  useEffect(() => {
    // Set to True to initialize everything
    setLoading(true);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });

    const fetchProjects = async () => {
      // Get database from supabase - Has to be its exact name
      const { data, error } = await supabase
        .from('Projects')
        .select()

      if (error) {
        setProjects(null);
        console.log(error)
      }

      if (data) {
        setProjects(data);
      }
    }

    AOS.init({ duration: 1000 }); // Init animation library
    fetchProjects();

    document.title = "Lanz Angeles | All Projects";

    setLoading(false);
  }, [loading]);

  for (let key in projects) {
    project_lst.push(projects[key]);
  }

  return (
    <AnimatePage>
      <div id="all_projects_page">
        {project_lst.sort((a, b) => a.priority - b.priority)
          .map((project) => ProjectCard(project, open))}
      </div>
    </AnimatePage>
  );
}

export default AllProjects;

