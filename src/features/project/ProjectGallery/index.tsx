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
      textClassName="text-foreground my-8"
    >
      <div className="mt-4 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
        {images?.map((image, index) => (
          <button
            key={image}
            className="min-w-0 max-w-full overflow-hidden rounded-lg border-2 border-accent shadow-lg transition-transform hover:scale-105 hover:cursor-pointer"
            onClick={(e) => {
              openImage(image, e);
              setImageAtt(imageAtts?.[index] ?? "");
            }}
            type="button"
          >
            <img
              src={image}
              alt={imageAtts?.[index] ?? ""}
              className="h-64 w-full max-w-full object-cover"
            />
            <div className="bg-border p-4 max-xs:p-2">
              <p className="m-0 wrap-break-word text-sm text-card-foreground max-xs:text-xs">
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
