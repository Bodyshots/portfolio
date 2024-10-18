import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import './projectcarousel.css';
import ProjectCard from '../ProjectCard';
import { AnimatePresence, motion } from 'framer-motion';
import ProjectModal from '../ProjectModal';
import { useState } from 'react';


// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function ProjectCarousel(project_dict) {

    let projects = [];
    const [modalOpen, setModalOpen] = useState(false);
    const open = () => setModalOpen(true);
    const close = () => setModalOpen(false);

      for (let key in project_dict) {
        projects.push(project_dict[key]);
      }

      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "5px",
        slidesToShow: Math.min(3, projects.length),
        speed: 500,
        autoplay: false,
        autoplaySpeed: 3000,
      };

  return (
    <>
        {(projects && projects.length > 0) ? <div className="projectcarousel">
        <Slider {...settings}>
            {projects.map((item) => (
              <div>
                {ProjectCard(item)}
              </div>
            ))}
        </Slider>
        </div> : <div id='none_projectcarousel'>Hmmm... There are no projects here!</div>}
    </>
  );
}

export default ProjectCarousel;