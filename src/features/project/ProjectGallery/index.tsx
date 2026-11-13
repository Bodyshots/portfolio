import ProjectSection from "../ProjectSection";

interface ProjectGalleryProps {
  images?: string[] | null;
  imageAtts?: string[] | null;
  openImage: (image: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  setImageAtt: (imageAtt: string) => void;
}

const ProjectGallery = ({
  images,
  imageAtts,
  openImage,
  setImageAtt,
}: ProjectGalleryProps) => {
  return (
    <ProjectSection
      title="Project Gallery"
      wrapperClassName="mb-12"
      textClassName="text-3xl text-secondary-foreground my-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {images?.map((image, index) => (
          <button
            key={image}
            className="rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-105 border-accent"
            onClick={(e) => {
              openImage(image, e);
              setImageAtt(imageAtts?.[index] ?? "");
            }}
            type="button"
          >
            <img
              src={image}
              alt={imageAtts?.[index] ?? ""}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-border">
              <p className="text-sm text-muted-foreground m-0">
                {imageAtts?.[index] ?? ""}
              </p>
            </div>
          </button>
        ))}
      </div>
    </ProjectSection>
  );
};

export default ProjectGallery;
