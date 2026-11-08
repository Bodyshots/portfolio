import { useProjectStore } from "@/store/useProjectStore";

function ProjectVideo() {
  const projectVideo = useProjectStore((state) => state.selectedProject)?.video;

  return (
    projectVideo && (
      <div className="rounded-lg shadow-lg mb-4">
        <iframe
          className="w-full aspect-video my-8 rounded-lg bg-secondary border-accent"
          src={projectVideo}
          title="YouTube video player"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        />
      </div>
    )
  );
}

export default ProjectVideo;
