import { useQuery } from "@tanstack/react-query";
import LoadingSkeleton from "@/features/global/Skeletons/LoadingSkeleton";
import { getProjectVideoUrl } from "@/lib/videos";
import {
  type ProjectVideo as ProjectVideoType,
  QueryTableType,
} from "@/models";
import { createOptions } from "@/tanstack/queryFns";

function ProjectVideo({ projectName }: { projectName: string }) {
  const {
    data: videos,
    isPending,
    isError,
  } = useQuery({
    ...createOptions<ProjectVideoType[]>({
      query: { queryTable: QueryTableType.PROJECT, queryKey: "projectVideos" },
      param: projectName,
    }),
    enabled: Boolean(projectName),
  });

  if (isPending) {
    return (
      <LoadingSkeleton className="my-6 mt-0 block aspect-video w-full max-w-full rounded-lg!" />
    );
  }

  if (isError) {
    return (
      <div className="mb-4 min-w-0 rounded-lg shadow-lg">
        <div
          className="my-8 mt-0 flex aspect-video w-full min-w-0 items-center justify-center rounded-lg border-accent bg-secondary px-4 text-center text-foreground text-5xl max-sm:text-3xl max-xs:text-xl"
          role="alert"
        >
          Failed to load video
        </div>
      </div>
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
