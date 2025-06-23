import Slider from 'react-slick';
import { useState } from 'react';
import ProjectCard from '../ProjectCard';
import { AnimatePresence } from 'framer-motion';
import Backdrop from '../Backdrop';
import ProjectModal from '../ProjectModal';

import './projectcarousel.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

// Most carousel code from: https://www.youtube.com/watch?v=FLt2TveqHQM
// and https://react-slick.neostack.com/docs/example/custom-arrows

function ProjectCarousel(project_lst) {
  const [isActive, setIsActive] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);

  const open = (id) => {
    setIsActive(id);
    setModalOpen(true);
  }
  const close = () => setModalOpen(false);

  const major_projects = project_lst.map((item) => { if (item.major) return item }).filter(item => item).sort((a, b) => a.priority - b.priority);

  const settings = {
    infinite: true,
    centerPadding: "5px",
    slidesToShow: Math.min(2, major_projects.length),
    speed: 500,
    responsive: [
      {
        breakpoint: 1384,
        settings: {
          slidesToShow: Math.min(1, major_projects.length),
        }
      }
    ]
  };

  return (
    <>
      {(major_projects && major_projects.length > 0) ?
        <div className="projectcarousel">
          <Slider {...settings}>
            {major_projects.map((item, i) => (
              <div key={i}>
                {item && ProjectCard(item, modalOpen, open, close)}
              </div>
            ))}
          </Slider>
        </div> : <div id='none_projectcarousel'>Hmmm... There are no projects here!</div>}
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
                id={isActive} />
            </Backdrop>
          </div>)}
      </AnimatePresence>
    </>
  );
}

export default ProjectCarousel;