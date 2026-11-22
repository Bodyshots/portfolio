import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import { getProjectVideoUrl } from "@/lib/videos";
import { createProjectVideosOptions } from "@/tanstack/queryFns/videos";

function ProjectVideo({ projectName }: { projectName: string }) {
  // TODO: Handle <error>
  const { data: videos, isPending } = useQuery({
    ...createProjectVideosOptions(projectName),
    enabled: Boolean(projectName),
  });

  if (isPending) {
    return (
      <LoadingSkeleton className="my-6 mt-0 block aspect-video w-full max-w-full rounded-lg!" />
    );
  }

  if (!videos || videos.length <= 0) return null;

  // Open to having more videos (eg. carousel)
  // For now, we'll only select one if there are multiple
  const video = videos[0];

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

export default ProjectVideo;
