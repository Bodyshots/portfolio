import React, { useState } from "react";
import Backdrop from "../Backdrop";
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
  

const ProjectModal = ({ handleClose, text }) => {

    return (
      <Backdrop onClick={handleClose}>
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
                {text}
            </div>
            <button onClick={handleClose}>Close</button>
          </motion.div>
      </Backdrop>
    );
  };

  
export default ProjectModal;

//     const [popup, setPopup] = useState(false);
//     const togglePopup = () => setPopup(!popup);

//     if (popup) document.body.classList.add('active_addshopitem_popup');
//     else document.body.classList.remove('active_addshopitem_popup');

//     return (
//         <div className='shop_item_container'>
//             <Button className="btn card shop_item" id="add_card" onClick={togglePopup}>
//                 <div className="plus radius" id='add_btn'>
//                 </div>
//             </Button>
//             <Modal 
//                 show={popup} 
//                 onHide={togglePopup} 
//                 id='addshoprecipe_modal'
//                 contentClassName = 'addshoprecipe_content'
//             >
//                 <Modal.Header closeButton>
//                     <Modal.Title>Add a recipe to your shopping list</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body id='addshoprecipe_content'>
//                     <Form className="d-flex" role="search" id="shop_search">
//                         <Form.Control
//                             type="search"
//                             placeholder = "What recipes do you want to add?"
//                             aria-label="Add Shopping List Recipe"
//                             id="add_shoplstrecipe"
//                         />
//                     </Form>
//                 </Modal.Body>
//                 <Modal.Footer id='addshoprecipe_modal_footer'>
//                     <Button variant="primary" onClick={togglePopup} className='shop_lst_btn'>
//                         Save Changes
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//             {children}
//         </div>
//     );
// }