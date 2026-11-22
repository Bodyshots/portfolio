import { getProjectImageUrl } from "@/lib/images";
import type { ProjectImage } from "@/types";
import ProjectSection from "../ProjectSection";

interface ProjectGalleryProps {
  projectName: string;
  images?: ProjectImage[] | null;
  openImage: (image: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  setImageAtt: (imageAtt: string) => void;
}

const ProjectGallery = ({
  projectName,
  images,
  openImage,
  setImageAtt,
}: ProjectGalleryProps) => {
  return (
    <ProjectSection
      title="Project Gallery"
      textClassName="text-foreground my-8"
    >
      {images && images.length > 0 ? (
        <div className="mt-4 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2 mb-12">
          {images.map((image) => {
            const imageUrl = getProjectImageUrl({
              projectName,
              imageType: image.type,
              name: image.name,
            });

            return (
              <button
                key={image.name}
                className="min-w-0 max-w-full overflow-hidden rounded-lg border-2 border-accent shadow-lg transition-transform hover:scale-105 hover:cursor-pointer"
                onClick={(e) => {
                  openImage(imageUrl, e);
                  setImageAtt(image.attribution);
                }}
                type="button"
              >
                <img
                  src={imageUrl}
                  alt={image.attribution}
                  className="h-64 w-full max-w-full object-cover"
                />
                <div className="bg-border p-4 max-xs:p-2">
                  <p className="m-0 wrap-break-word text-sm text-card-foreground max-xs:text-xs">
                    {image.attribution}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      ) : (
        <span className="mt-4 flex justify-center items-center w-full wrap-break-word text-2xl text-foreground">
          No project images available
        </span>
      )}
    </ProjectSection>
  );
};

export default ProjectGallery;
