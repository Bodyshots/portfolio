import { motion } from "framer-motion";
import {
  Award,
  Briefcase,
  Calendar,
  MapPin,
  Users,
  Wrench,
  X,
} from "lucide-react";
import "./workhistorymodal.css";
import "../workhistory.css";
import "../../globals.css";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const dropIn = {
  hidden: { y: "-100vh", opacity: 0 },
  visible: {
    y: "0",
    opacity: 1,
    transition: { duration: 0.1, type: "spring", damping: 25, stiffness: 500 },
  },
  exit: { y: "100vh", opacity: 0 },
};

export function WorkHistoryModal({ selectedJob, modalOpen, open, close }) {
  return (
    <motion.div
      className="workhistory-modal-overlay"
      variants={backdrop}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={close}
    >
      <div
        key={selectedJob.id}
        onClick={() => (modalOpen ? close() : open(selectedJob.id))}
        role="dialog"
        onKeyDown={(e) => e.stopPropagation()}
      >
        <motion.div
          className="workhistory-modal bg-border"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
          onClick={(e) => e.stopPropagation()}
          onKeyDown={(e) => e.stopPropagation()}
        >
          <div className="workhistory-modal-header">
            <div className="workhistory-modal-header-row">
              <div className="flex-1 pr-4">
                <h1 className="workhistory-modal-title">{selectedJob.title}</h1>
                <h2 className="workhistory-modal-company">
                  {selectedJob.company}
                </h2>
                <div className="workhistory-modal-meta">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {selectedJob.years}
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-4 h-4" />
                    {selectedJob.location}
                  </div>
                  {selectedJob.teamSize && (
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4" />
                      {selectedJob.teamSize}
                    </div>
                  )}
                </div>
              </div>
              <button
                onClick={close}
                className="workhistory-modal-close"
                aria-label="Close"
                type="button"
              >
                <X className="w-6 h-6" style={{ color: "#8d494d" }} />
              </button>
            </div>
          </div>

          <div className="workhistory-modal-content">
            <div className="text-left">
              <h3 className="workhistory-modal-section-title">
                <Briefcase className="w-5 h-5" />
                Key Responsibilities
              </h3>
              {selectedJob?.responsibilities ? (
                <ul className="workhistory-modal-list">
                  {selectedJob.responsibilities.map((resp) => (
                    <li
                      key={crypto.randomUUID()}
                      className="workhistory-modal-list-item"
                    >
                      <span
                        className="workhistory-modal-list-dot"
                        style={{ backgroundColor: "#b9937c" }}
                      ></span>
                      {resp}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No responsibilities available. Check back later!</span>
              )}
            </div>

            <div className="text-left">
              <h3 className="workhistory-modal-section-title">
                <Award className="w-5 h-5" />
                Key Achievements
              </h3>
              {selectedJob?.achievements ? (
                <ul className="workhistory-modal-list">
                  {selectedJob.achievements.map((achievement) => (
                    <li
                      key={crypto.randomUUID()}
                      className="workhistory-modal-list-item"
                    >
                      <span
                        className="workhistory-modal-list-dot"
                        style={{ backgroundColor: "#b9937c" }}
                      ></span>
                      {achievement}
                    </li>
                  ))}
                </ul>
              ) : (
                <span>No achievements available. Check back later!</span>
              )}
            </div>

            <div>
              <h3 className="workhistory-modal-section-title">
                <Wrench className="w-5 h-5" />
                Technologies & Tools
              </h3>
              <div className="workhistory-modal-tech">
                {selectedJob?.technologies ? (
                  selectedJob.technologies.map((tech) => (
                    <span
                      key={crypto.randomUUID()}
                      className="workhistory-modal-tech-item"
                    >
                      {tech}
                    </span>
                  ))
                ) : (
                  <span className="text-left">
                    No technologies available. Check back later!
                  </span>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
