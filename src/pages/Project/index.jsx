import './project.css';
import '../../components/globals.css';
import Container from 'react-bootstrap/Container';
import AnimatePage from '../../components/AnimatePage';
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import supabase from '../../config/supabaseClient';
import { MdOutlineImageNotSupported } from "react-icons/md";

function Project() {
  const { setLoading } = useContext(UserContext);
  const { projName } = useParams();

  const [project, setProject] = useState(null);

  useEffect(() => {
    setLoading(true);
    AOS.init({ duration: 1000 });

    const fetchProject = async () => {
      // Get database from supabase - Has to be its exact name
      if (projName) {
        const normName = projName.replace(/-/g, " ").toLowerCase();

        const { data, error } = await supabase
          .from('Projects')
          .select()

        if (error) {
          setProject(null);
          console.error(error)
        }

        if (data) {
          setProject(data.find((p) => p.name.toLowerCase().replace(/\s+/g, "-") === normName));
        }
      }
    }

    fetchProject(); // Get projects from database
    setLoading(false);
  }, [setLoading]);

  console.log("Found project: ", project)

  return (
    <AnimatePage>
      <Container id='not_found_container'>
        <h1 id='not_found_title'>Page not found!</h1>
        <h4 id='not_found_subtitle'>Hmmm... Are you sure you're supposed to be here?</h4>
      </Container>
    </AnimatePage>
  );
}

export default Project