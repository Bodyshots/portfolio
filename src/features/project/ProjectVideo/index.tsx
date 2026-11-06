interface ProjectVideoProps {
  video: string | null;
}

function ProjectVideo({ video }: ProjectVideoProps) {
  return (
    video && (
      <div className="rounded-lg shadow-lg border-accent mb-16">
        <iframe
          className="w-full aspect-video my-8 border-none bg-secondary"
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
