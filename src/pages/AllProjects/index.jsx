import './allprojects.css';
import '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext } from 'react';
import ProjectCard from '../../components/ProjectCard';
import supabase from '../../config/supabaseClient';
import Backdrop from '../../components/Backdrop';
import { AnimatePresence } from 'framer-motion';
import ProjectModal from '../../components/ProjectModal';

const AllProjects = ({ }) => {

    const { loading, setLoading } = useContext(UserContext);

    let project_lst = [];
    const [projects, setProjects] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [isActive, setIsActive] = useState(-1);
    
    const open = (id) => {
      setIsActive(id);
      setModalOpen(true);
    }
    const close = () => setModalOpen(false);

    useEffect(() => {
        // Set to True to initialize everything
        setLoading(true);
        window.scrollTo({top: 0, left: 0, behavior: 'smooth' });

        const fetchProjects = async () => {
            // Get database from supabase
            // Has to be its exact name
            const { data, error } = await supabase
                .from('Projects')
                .select()

                if (error) {
                    setFetchError("Could not fetch projects");
                    setProjects(null);
                    console.log(error)
                }

                if (data) {
                    setProjects(data);
                    setFetchError(null);
                }
        }

        // Initialize animation library
        AOS.init({ duration: 1000 });
        // Get projects from database
        fetchProjects();
        // Set new title
        document.title = "Lanz Angeles | All Projects";
        
        // Everything's done (ie. done loading)
        setLoading(false);
    }, [loading]);

    for (let key in projects) {
        project_lst.push(projects[key]);
    }

  return (
    <AnimatePage>
        <div id="all_projects_page">
            {project_lst.map((project) => ProjectCard(project, modalOpen, open, close))}
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
            {modalOpen && 
            (<div className="modal_container">
                <Backdrop onClick={close}>
                    <ProjectModal handleClose={close} 
                                    project_lst={project_lst}
                                    id={isActive}/>
                </Backdrop>
            </div>)}
            </AnimatePresence>
        </div>
    </AnimatePage>
  );
}

export default AllProjects;

