import './allprojects.css';
import '../../components/globals.css';
import AnimatePage from '../../components/AnimatePage';
import React, { useEffect, useRef } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { UserContext } from '../../App';
import { useContext } from 'react';

const AllProjects = () => {

    const { setLoading } = useContext(UserContext);

    useEffect(() => {
        setLoading(true);
        AOS.init({ duration: 1000 });
        setLoading(false);
    }, [setLoading]);

  return (
    <AnimatePage>
        <div id="secret_page">
            <iframe
                    width="893" 
                    height="711" 
                    src="https://www.youtube.com/embed/9CUzNF3GuRk?&autoplay=1" 
                    title="secret" 
                    frameborder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen>
            </iframe>
            <div className="secretText_container">
                <span class="demo rainbow">you found a SECRET</span>
            </div>
        </div>
    </AnimatePage>
  );
}

export default AllProjects;

