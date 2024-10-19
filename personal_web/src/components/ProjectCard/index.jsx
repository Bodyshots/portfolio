import '../globals.css'
import './projectcard.css'

import React from 'react';
import ProjectModal from '../ProjectModal';
import { motion, AnimatePresence } from 'framer-motion';
import noimage from '../../images/noimageavailable.png'

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function ProjectCard(item, modalOpen, open, close, isActive) {
    const SHORT_DESC = item.short_desc
    const SHORT_DESC_LIMIT = 65;

    const NAME = item.name
    const MAJOR = item.major
    const IMG_URL = item.image
    const VID = item.video

    return (
    <div className="projectcard gradient"
         key={item.id}
         onClick={() => (modalOpen ? close() : open(item.id))}
         data-aos="fade-right">
        <div className="projectcard-top img_wrap">
            <img
                src={IMG_URL ? IMG_URL : noimage}
                alt={NAME}
                id='projectcard_img'
            />
        <div className='card_info'>
            <p className='card_title'>{NAME}</p>
        </div>
        <div className="projectcard-bottom">
            {/* <h3 className='card_text'>{project.name.length > 15 ? project.name.substring(0, 15) + '...' : project.name}</h3>
            <span className="projectcat card_text">Cooking time: {project.cook_time}</span> */}
        </div>
        <p className='card_short_desc'>{SHORT_DESC.length > SHORT_DESC_LIMIT 
                                                ? SHORT_DESC.substring(0, SHORT_DESC_LIMIT) + '...'
                                                : SHORT_DESC.length === 0
                                                ? 'No short description' 
                                                : SHORT_DESC}</p>
        </div>
        {/* <AnimatePresence
            initial={false}
            mode="wait"
            onExitComplete={() => null}
        >
            {console.log("modal open: " + modalOpen)}
            {console.log("isActive: " + isActive)}
            {console.log("index: " + index)}
            {modalOpen && (isActive === index) && <ProjectModal modalOpen={modalOpen} handleClose={close} text={"test"}/>}
        </AnimatePresence> */}
    </div>
    );
}

export default ProjectCard;