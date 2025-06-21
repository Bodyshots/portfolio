import { motion } from "framer-motion";
import { MdOutlineImageNotSupported } from "react-icons/md";
import { MdOutlineVideocamOff } from "react-icons/md";
import { CustomImg } from "../CustomImg/customimg";
import { Carousel } from "react-bootstrap";

import "./projectmodal.css"
import "../globals.css"

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
  const ITEM_IMAGES = target_item.images;
  const IMAGE_ATTS = target_item.image_atts;
  const ITEM_NAME = target_item.name;
  const TOOLS = target_item.tools;
  const GITHUB_LINK = target_item.github;

  const card_tools = () => {
    return (
      <div className="projectModalTools">
        {TOOLS.map((tool, i) =>
          <div className="projectModalTool" key={i}>
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
          <span id='close_item' className='plus' />
        </button>
      </div>
      <div className="projectModalBody">
        <div className="projectModalText">
          <span className="projectModalTitle">{ITEM_NAME}</span>
          <span className="projectModalDesc">{LONG_DESC ? LONG_DESC : "No long description available."}</span>
          <div className="projectModalRest">
            <span className="projectModalBotTitle">Development tools</span>
            <div className="projectModalTools">
              <span styles={{ width: "100%", marginBottom: "2em" }}>{card_tools()}</span>
            </div>
          </div>
        </div>
        <div className="project_media">
          {ITEM_IMAGES ?
            ((ITEM_IMAGES.length > 1) ?
              (<Carousel data-bs-theme="dark" indicators={false}>
                {ITEM_IMAGES.map((image, i) => (
                  <Carousel.Item key={i}>
                    <CustomImg caption={IMAGE_ATTS[i]} alt={ITEM_NAME} src={image} />
                  </Carousel.Item>
                ))}
              </Carousel>) : <CustomImg caption={IMAGE_ATTS[0]} alt={ITEM_NAME} src={ITEM_IMAGES[0]} />) :
            <MdOutlineImageNotSupported id="missing_img_modal" />}
          {(ITEM_VID) ? <iframe className="project_video"
            src={ITEM_VID}
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerpolicy="strict-origin-when-cross-origin"
            allowfullscreen>
          </iframe> :
            <MdOutlineVideocamOff id="missing_video_modal" />}
          {(GITHUB_LINK) ? <a className="modal_github_link" href={GITHUB_LINK}>See the GitHub repo here</a> :
            <span className="missing_github_link">No GitHub link available. Feel free to ask me about this project though!</span>}
        </div>
      </div>
    </motion.div>
  );
};


export default ProjectModal;