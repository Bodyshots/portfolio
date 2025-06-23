import { Briefcase, X, Calendar, MapPin, Users, Award, Wrench } from "lucide-react"
import { useState, useEffect } from "react"
import "./workhistory.css"
import { AnimatePresence } from "framer-motion"
import { WorkHistoryModal } from "./WorkHistoryModal";
import Backdrop from "../Backdrop";
import supabase from '../../config/supabaseClient';

export default function WorkHistory() {
    let experience_lst = [];
    const [isActive, setIsActive] = useState(-1);
    const [modalOpen, setModalOpen] = useState(false);
    const [experience, setExperience] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {
        const fetchExperience = async () => {
            const { data, error } = await supabase
                .from('Experience')
                .select()

            if (error) {
                setFetchError("Could not fetch experience");
                setExperience(null);
                console.log(error);
            }

            if (data) {
                setExperience(data);
                setFetchError(null);
            }
        }
        fetchExperience();
    }, [experience])

    const open = (id) => {
        setIsActive(id);
        setModalOpen(true);
    }
    const close = () => setModalOpen(false);

    if (experience && Array.isArray(experience)) {
        experience_lst = [...experience].sort((a, b) => a.id - b.id);
    }

    return ((experience_lst && experience_lst.length > 0) ?
        <div className="workhistory-container">
            <div className="workhistory-inner">
                <h1 className="workhistory-title">
                    From present to oldest (2023)
                </h1>
                <div className="workhistory-timeline">
                    <div className="workhistory-timeline-line"></div>
                    {experience_lst.map((job, index) => {
                        return (
                            (index % 2 === 1) ?
                                <div key={job.id} className="workhistory-row-left">
                                    {/* Left side content */}
                                    <div className="workhistory-left">
                                        <div
                                            className="workhistory-card"
                                            style={{
                                                backgroundColor: "#efe9cd",
                                                borderColor: "#e5ddac",
                                            }}
                                            onClick={() => open(job.id)}
                                        >
                                            <h2 className="workhistory-card-title" style={{ color: "#61001d" }}>
                                                {job.title}
                                            </h2>
                                            <h3 className="workhistory-card-company" style={{ color: "#8d494d" }}>
                                                {job.company}
                                            </h3>
                                            <p className="workhistory-card-years" style={{ color: "#8d494d" }}>
                                                {job.years}
                                            </p>
                                            <p className="workhistory-card-desc" style={{ color: "#61001d" }}>
                                                {job.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center node for each experience */}
                                    <div className="workhistory-center">
                                        <div className="workhistory-node"></div>
                                    </div>
                                </div> :
                                <div key={job.id} className="workhistory-row-right">
                                    {/* Right side content */}
                                    <div className="workhistory-right">
                                        <div
                                            className="workhistory-card"
                                            style={{
                                                backgroundColor: "#ffffff",
                                                borderColor: "#efe9cd",
                                            }}
                                            onClick={() => open(job.id)}
                                        >
                                            <h2 className="workhistory-card-title" style={{ color: "#61001d" }}>
                                                {job.title}
                                            </h2>
                                            <h3 className="workhistory-card-company" style={{ color: "#8d494d" }}>
                                                {job.company}
                                            </h3>
                                            <p className="workhistory-card-years" style={{ color: "#8d494d" }}>
                                                {job.years}
                                            </p>
                                            <p className="workhistory-card-desc" style={{ color: "#61001d" }}>
                                                {job.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center node for each experience */}
                                    <div className="workhistory-center">
                                        <div className="workhistory-node" />
                                    </div>
                                </div>
                        )
                    })}
                </div>
            </div>
            <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
            >
                {modalOpen &&
                    (<div className="modal_container">
                        <Backdrop onClick={close}>
                            <WorkHistoryModal
                                selectedJob={experience_lst[isActive - 1]}
                                modalOpen={modalOpen}
                                open={open}
                                close={close} />
                        </Backdrop>
                    </div>)}
            </AnimatePresence>
        </div> : <div id='none_experience'>Hmmm... There's nothing here!</div>);
}