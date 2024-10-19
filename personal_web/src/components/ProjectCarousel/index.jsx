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

function ProjectCarousel(project_lst, modalOpen, open,
                         close, isActive) {

      const settings = {
        className: "center",
        centerMode: true,
        infinite: true,
        centerPadding: "5px",
        slidesToShow: Math.min(3, project_lst.length),
        speed: 500,
      };

  return (
    <>
        {(project_lst && project_lst.length > 0) ? <div className="projectcarousel">
        <Slider {...settings}>
            {project_lst.map((item) => (
              <div>
                {ProjectCard(item, modalOpen, open, close, isActive)}
              </div>
            ))}
        </Slider>
        </div> : <div id='none_projectcarousel'>Hmmm... There are no projects here!</div>}
    </>
  );
}

export default ProjectCarousel;