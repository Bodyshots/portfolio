import "./projectvideo.css";
import { MdOutlineVideocamOff } from "react-icons/md";
import { VideoConstants } from "../../../constants/video";

function ProjectVideo(projectVideo) {
  return projectVideo ? (
    <div className="rounded-lg shadow-lg  border-accent">
      <iframe
        className="project_video"
        src={projectVideo}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ marginTop: "1em", marginBottom: "1em" }}
      />
    </div>
  ) : (
    <MdOutlineVideocamOff
      id="missing_video_modal"
      size={VideoConstants.MISSING_LOGO_SIZE}
    />
  );
}

export default ProjectVideo;
