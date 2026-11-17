interface ProjectVideoProps {
  video: string | null;
}

function ProjectVideo({ video }: ProjectVideoProps) {
  return (
    video && (
      <div className="mb-4 min-w-0 rounded-lg shadow-lg">
        <iframe
          className="my-8 mt-0 block aspect-video w-full min-w-0 rounded-lg border-accent bg-secondary"
          src={video}
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
