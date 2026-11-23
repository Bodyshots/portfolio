import { useQuery } from "@tanstack/react-query";
import LoadingGallery from "@/features/global/Skeletons/LoadingGallery";
import { getProjectImageUrl } from "@/lib/images";
import { createProjectGalleryImagesOptions } from "@/tanstack/queryFns/images";
import ProjectSection from "../ProjectSection";

interface ProjectGalleryProps {
  projectName: string;
  openImage: (
    image: string,
    attribution: string,
    e: React.MouseEvent<HTMLButtonElement>,
  ) => void;
}

const ProjectGallery = ({ projectName, openImage }: ProjectGalleryProps) => {
  const {
    data: images,
    isPending,
    isError,
  } = useQuery({
    ...createProjectGalleryImagesOptions(projectName),
    enabled: Boolean(projectName),
  });

  if (isPending) {
    return (
      <ProjectSection
        title="Project Gallery"
        textClassName="text-foreground my-8"
      >
        <LoadingGallery />
      </ProjectSection>
    );
  }

  if (isError) {
    return (
      <ProjectSection
        title="Project Gallery"
        textClassName="text-foreground my-8"
        wrapperClassName="my-0"
      >
        <span
          className="mt-4 flex w-full items-center justify-center wrap-break-word text-2xl text-foreground"
          role="alert"
        >
          Failed to load images
        </span>
      </ProjectSection>
    );
  }

  if (!images?.length) {
    return (
      <ProjectSection
        title="Project Gallery"
        textClassName="text-foreground my-8"
        wrapperClassName="my-0"
      >
        <span className="mt-4 flex w-full items-center justify-center wrap-break-word text-2xl text-foreground">
          No project images available
        </span>
      </ProjectSection>
    );
  }

  return (
    <ProjectSection
      title="Project Gallery"
      textClassName="text-foreground my-8"
    >
      <div className="mb-12 mt-4 grid min-w-0 grid-cols-1 gap-6 md:grid-cols-2">
        {images.map((image) => {
          const imageUrl = getProjectImageUrl({
            projectName,
            imageType: image.type,
            name: image.name,
          });

          return (
            <button
              key={image.name}
              className="min-w-0 max-w-full overflow-hidden rounded-lg border-2 border-accent shadow-lg transition-transform hover:cursor-pointer hover:scale-105"
              onClick={(event) => openImage(imageUrl, image.attribution, event)}
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
    </ProjectSection>
  );
};

export default ProjectGallery;
