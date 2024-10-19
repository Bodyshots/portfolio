import React, { useState } from "react";
import { motion } from "framer-motion";

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

    return (
        <motion.div
            onClick={(e) => e.stopPropagation()}  
            className="projectModal orange-gradient"
            // className="projectModal"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
            >
            <div className="projectModalText">
                {LONG_DESC}
            </div>
            <button onClick={handleClose}>Close</button>
        </motion.div>
    );
  };

  
export default ProjectModal;