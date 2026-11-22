import LoadingVideo from "@/features/global/Skeletons/LoadingVideo";
import { getProjectVideoUrl } from "@/lib/videos";
import type { ProjectVideo } from "@/types";

interface ProjectVideoProps {
  isPending: boolean;
  video: ProjectVideo | null;
}

function ProjectVideoComp({ isPending, video }: ProjectVideoProps) {
  if (isPending) return <LoadingVideo />;
  if (!video) return null;

  return (
    <div className="mb-4 min-w-0 rounded-lg shadow-lg">
      <iframe
        className="my-8 mt-0 block aspect-video w-full min-w-0 rounded-lg border-accent bg-secondary"
        src={getProjectVideoUrl({
          projectName: video.project_name,
          name: video.name,
        })}
        title="YouTube video player"
        allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      />
    </div>
  );
}

export default ProjectVideoComp;
