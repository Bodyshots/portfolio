import React, { useState } from "react";
import { motion } from "framer-motion";
import noimage from '../../images/noimageavailable.png'

import "./projectmodal.css"
import  "../globals.css"

const dropIn = {
    hidden: {
      y: "-100vh",
      opacity: 0,
    },
    visible: {
      y: "0",
      opacity: 1,
      transition: {
        duration: 0.1,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
    },
  };
  

const ProjectModal = ({ handleClose, project_lst, id }) => {

    const target_item = project_lst.find(item => item.id === id)
    const LONG_DESC = target_item.long_desc
    const ITEM_VID = target_item.video;
    const ITEM_IMAGE = target_item.image;
    const ITEM_NAME = target_item.name;
    const TOOLS = target_item.tools;

    const card_tools = () => {
      return (
        <div className="projectModalTools">
          {TOOLS.map((tool) =>
            <div className="projectModalTool">
              {tool}
            </div>
          )}
        </div>);
    }

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="projectModal orange-gradient"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <div className="projectCloseContainer">
              <button id="close_btn" onClick={() => handleClose()}>
                <span id='close_item' className='plus'/>
              </button>
            </div>
            <div className="projectModalBody">
                <div className="projectModalText">
                  <span className="projectModalTitle">{ITEM_NAME}</span>
                  <span className="projectModalDesc">{LONG_DESC ? LONG_DESC : "No long description available."}</span>
                  <div className="projectModalRest">
                    <span className="projectModalBotTitle">Development tools</span>
                    <div className="projectModalTools">
                    <span styles={{width: "100%"}}>{card_tools()}</span>
                    </div>
                  </div>
                </div>
                <div className="project_media">
                  <img
                    src={ITEM_IMAGE ? ITEM_IMAGE : noimage}
                    alt={ITEM_NAME}
                    className="project_imgs"
                  />
                <iframe className="project_video"
                        src="https://www.youtube.com/embed/qs9S1hxnApU?si=3fbCC5jekQAq-Y26"
                        title="YouTube video player"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerpolicy="strict-origin-when-cross-origin" 
                        allowfullscreen>
                </iframe>
                </div>
            </div>
        </motion.div>
    );
  };

  
export default ProjectModal;