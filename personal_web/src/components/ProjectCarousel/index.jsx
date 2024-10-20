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

  const major_projects = project_lst.map((item) => {if (item.major) return item}).filter(item => item)

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "5px",
    slidesToShow: Math.min(3, major_projects.length),
    speed: 500,
  };

  return (
    <>
        {(major_projects && major_projects.length > 0) ? 
        <div className="projectcarousel">
          <Slider {...settings}>
              {major_projects.map((item) => (
                <div>
                  {item && ProjectCard(item, modalOpen, open, close, isActive)}
                </div>
              ))}
          </Slider>
        </div> : <div id='none_projectcarousel'>Hmmm... There are no projects here!</div>}
    </>
  );
}

export default ProjectCarousel;