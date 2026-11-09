interface ProjectVideoProps {
  video: string | null;
}

function ProjectVideo({ video }: ProjectVideoProps) {
  return (
    video && (
      <div className="rounded-lg shadow-lg mb-4">
        <iframe
          className="w-full aspect-video my-8 mt-0 rounded-lg bg-secondary border-accent"
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
