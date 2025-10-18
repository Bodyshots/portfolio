import './projectvideo.css'
import { MdOutlineVideocamOff } from "react-icons/md";

function ProjectVideo(projectVideo) {
  return (
    projectVideo ? (
      <iframe
        className="project_video"
        src={projectVideo}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        style={{ marginTop: "1em", marginBottom: "1em" }}
      />
    ) : (
      <MdOutlineVideocamOff id="missing_video_modal" size={64} />
    )
  )
}

export default ProjectVideo