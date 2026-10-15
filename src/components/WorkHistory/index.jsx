import { useEffect, useMemo, useState } from "react";
import "./workhistory.css";
import { AnimatePresence } from "framer-motion";
import supabase from "../../config/supabaseClient";
import { WorkHistoryModal } from "./WorkHistoryModal";

export default function WorkHistory() {
  const [isActive, setIsActive] = useState(-1);
  const [modalOpen, setModalOpen] = useState(false);
  const [experience, setExperience] = useState(null);

  useEffect(() => {
    const fetchExperience = async () => {
      const { data, error } = await supabase.from("Experience").select();

      if (error) {
        setExperience(null);
        console.error("Could not fetch experience");
      }

      if (data) {
        setExperience(data);
        setFetchError(null);
      }
    };
    fetchExperience();
  }, []);

  const open = (id) => {
    setIsActive(id);
    setModalOpen(true);
  };
  const close = () => setModalOpen(false);

  const experience_lst = useMemo(
    () =>
      Array.isArray(experience)
        ? [...experience].sort((a, b) => a.id - b.id)
        : [],
    [experience],
  );

  return experience_lst && experience_lst.length > 0 ? (
    <div className="workhistory-container">
      <div className="workhistory-inner">
        <h1 className="workhistory-title">From present to oldest (2023)</h1>
        <div className="workhistory-timeline">
          <div className="workhistory-timeline-line"></div>
          {experience_lst.map((job, index) => {
            return index % 2 === 1 ? (
              <div key={job.id} className="workhistory-row-left">
                {/* Left side content */}
                <div className="workhistory-left">
                  <button
                    className="workhistory-card"
                    style={{
                      backgroundColor: "#efe9cd",
                      borderColor: "#e5ddac",
                    }}
                    onClick={() => open(job.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        open(job.id);
                      }
                    }}
                    type="button"
                    tabIndex={0}
                  >
                    <h2
                      className="workhistory-card-title"
                      style={{ color: "#61001d" }}
                    >
                      {job.title}
                    </h2>
                    <h3
                      className="workhistory-card-company"
                      style={{ color: "#8d494d" }}
                    >
                      {job.company}
                    </h3>
                    <p
                      className="workhistory-card-years"
                      style={{ color: "#8d494d" }}
                    >
                      {job.years}
                    </p>
                    <p
                      className="workhistory-card-desc"
                      style={{ color: "#61001d" }}
                    >
                      {job.description}
                    </p>
                  </button>
                </div>

                {/* Center node for each experience */}
                <div className="workhistory-center">
                  <div className="workhistory-node" />
                </div>
              </div>
            ) : (
              <div key={job.id} className="workhistory-row-right">
                {/* Right side content */}
                <div className="workhistory-right">
                  <button
                    className="workhistory-card"
                    style={{
                      backgroundColor: "#ffffff",
                      borderColor: "#efe9cd",
                    }}
                    onClick={() => open(job.id)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        open(job.id);
                      }
                    }}
                    type="button"
                    tabIndex={0}
                  >
                    <h2
                      className="workhistory-card-title"
                      style={{ color: "#61001d" }}
                    >
                      {job.title}
                    </h2>
                    <h3
                      className="workhistory-card-company"
                      style={{ color: "#8d494d" }}
                    >
                      {job.company}
                    </h3>
                    <p
                      className="workhistory-card-years"
                      style={{ color: "#8d494d" }}
                    >
                      {job.years}
                    </p>
                    <p
                      className="workhistory-card-desc"
                      style={{ color: "#61001d" }}
                    >
                      {job.description}
                    </p>
                  </button>
                </div>

                {/* Center node for each experience */}
                <div className="workhistory-center">
                  <div className="workhistory-node" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalOpen && (
          <div className="modal_container">
            <WorkHistoryModal
              selectedJob={experience_lst[isActive - 1]}
              modalOpen={modalOpen}
              open={open}
              close={close}
            />
          </div>
        )}
      </AnimatePresence>
    </div>
  ) : (
    <div id="none_experience">Hmmm... There's nothing here!</div>
  );
}
