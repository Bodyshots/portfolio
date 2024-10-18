import React from 'react';
import noimage from '../../images/noimageavailable.png'
import '../globals.css'
import './projectcard.css'

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function ProjectCard(item) {

    const NAME = item['name']
    const SHORT_DESC = item['short_desc']
    const MAJOR = item['major']
    const IMG_URL = item['image']
    const VID = item['video']

    return (
    <div className="projectcard gradient" key={item.id}>
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
        <p className='card_short_desc'>{SHORT_DESC.length > 25 ? DESC + '...'
                                                : SHORT_DESC.length === 0
                                                ? 'No description' 
                                                : SHORT_DESC}</p>
        </div>
    </div>
    );
}

export default ProjectCard;