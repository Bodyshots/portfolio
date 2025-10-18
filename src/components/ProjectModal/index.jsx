import { motion } from "framer-motion";
import { ScrollText, X, Wrench } from "lucide-react"
import ProjectVideo from "../shared/ProjectVideo";
import ProjectImages from "../shared/ProjectImages"
import "./projectmodal.css";
import "../globals.css";

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.1, type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { y: "100vh", opacity: 0 },
};

const ProjectModal = ({ handleClose, project_lst, id }) => {
  const target_item = project_lst.find(item => item.id === id);
  const LONG_DESC = target_item.long_desc;
  const ITEM_VID = target_item.video;
  const ITEM_IMAGES = target_item.images;
  const IMAGE_ATTS = target_item.image_atts;
  const ITEM_NAME = target_item.name;
  const TOOLS = target_item.tools;
  const GITHUB_LINK = target_item.github;

  const card_tools = () => (
    <div className="workhistory-modal-tech">
      {TOOLS.map((tool, i) =>
        <span className="workhistory-modal-tech-item" key={i}>
          {tool}
        </span>
      )}
    </div>
  );

  return (
    <motion.div
      className="workhistory-modal-overlay"
      variants={dropIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={handleClose}
    >
      <div
        className="workhistory-modal"
        onClick={e => e.stopPropagation()}
      >
        <div className="workhistory-modal-header">
          <div className="workhistory-modal-header-row">
            <div className="flex-1 pr-4">
              <h1 className="workhistory-modal-title">{ITEM_NAME}</h1>
              <div className="workhistory-modal-meta" style={{ marginBottom: "0.5rem" }}>
                {GITHUB_LINK ? (
                  <a className="modal_github_link" href={GITHUB_LINK} target="_blank" rel="noopener noreferrer">
                    See the GitHub repo here
                  </a>
                ) : (
                  <span className="missing_github_link">
                    No GitHub link available. Feel free to ask me about this project though!
                  </span>
                )}
              </div>
            </div>
            {/* Close btn */}
            <button
              onClick={handleClose}
              className="workhistory-modal-close"
              aria-label="Close"
              type="button"
            >
              <X className="w-6 h-6" style={{ color: "#8d494d" }} />
            </button>
          </div>
        </div>
        <div className="workhistory-modal-content" style={{ display: "flex", flexDirection: "row", gap: "2rem", flexWrap: "wrap" }}>
          {/* Left: Description and tools */}
          <div style={{ flex: "1 1 300px", minWidth: "260px" }}>
            <h3 className="workhistory-modal-section-title">
              <ScrollText className="w-5 h-5" />
              Project Description
            </h3>
            <div className="workhistory-modal-list" style={{ marginBottom: "1.5rem" }}>
              <span className="workhistory-card-desc flex text-left">
                {LONG_DESC ? LONG_DESC : "No long description available."}
              </span>
            </div>
            <h3 className="workhistory-modal-section-title">
              <Wrench className="w-5 h-5" />
              Technologies & Tools
            </h3>
            {card_tools()}
          </div>
          {/* Right: Media */}
          <div style={{ flex: "1 1 320px", minWidth: "260px", display: "flex", flexDirection: "column", alignItems: "center" }}>
            {/* Images */}
            {ProjectImages(ITEM_NAME, ITEM_IMAGES, IMAGE_ATTS)}
            {/* Video */}
            {ProjectVideo(ITEM_VID)}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectModal;