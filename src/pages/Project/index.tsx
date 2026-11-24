import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageConstants } from "@/constants/image";
import ProjectDescription from "@/features/project/ProjectDescription";
import ProjectGallery from "@/features/project/ProjectGallery";
import ProjectHeader from "@/features/project/ProjectHeader";
import ProjectImageModal from "@/features/project/ProjectImageModal";
import ProjectSkeleton from "@/features/project/ProjectSkeleton";
import ProjectTools from "@/features/project/ProjectTools";
import ProjectVideo from "@/features/project/ProjectVideo";
import { createProjectOptions } from "@/tanstack/queryFns/project";
import { ProjectQueryKey, type Project as ProjectType } from "@/types";
import NotFound from "../NotFound";

function Project() {
  const { projectName } = useParams<{ projectName: string }>();

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    ...createProjectOptions<ProjectType>({
      key: ProjectQueryKey.PROJECT,
      projectName,
    }),
    enabled: Boolean(projectName),
  });

  const pageTitle = project
    ? `${project.name} - Lanz Angeles`
    : "Loading project... - Lanz Angeles";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageAtt, setSelectedImageAtt] = useState("");
  const [imagePosition, setImagePosition] = useState<{
    top: number;
    left: number;
    width: number;
    height: number;
  } | null>(null);
  const clickedImageRef = useRef<HTMLImageElement | null>(null);

  const openImageModal = (
    image: string,
    attribution: string,
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    const imageElement = event.currentTarget.querySelector("img");
    if (!imageElement) return;

    const rect = imageElement.getBoundingClientRect();

    clickedImageRef.current = imageElement;

    setImagePosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
    });

    setSelectedImage(image);
    setSelectedImageAtt(attribution);

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsModalOpen(true);
      });
    });
  };

  const closeImageModal = () => {
    if (clickedImageRef.current) {
      const rect = clickedImageRef.current.getBoundingClientRect();
      setImagePosition({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    }

    setIsModalOpen(false);
    setTimeout(() => {
      setSelectedImage("");
      setImagePosition(null);
      clickedImageRef.current = null;
    }, ImageConstants.DEFAULT_TIMEOUT);
  };

  useLayoutEffect(() => {
    if (projectName) window.scrollTo({ top: 0, behavior: "instant" });
  }, [projectName]);

  if (!projectName || error) return <NotFound />;

  return (
    <div className="flex min-w-0 w-full max-w-full min-h-screen h-full flex-col justify-center align-middle text-center m-auto pt-16 max-xs:pt-24">
      <title>{pageTitle}</title>
      {isPending ? (
        <ProjectSkeleton />
      ) : (
        <>
          <ProjectHeader
            title={project.name}
            shortDesc={project.short_desc}
            ghLink={project.github}
          />

          <main className="mx-auto w-full min-w-0 max-w-6xl px-8 py-8 pt-0 max-xs:px-2">
            <ProjectVideo projectName={project.name} />
            <ProjectDescription desc={project.long_desc} />
            <ProjectTools projectName={project.name} />
            <ProjectGallery
              projectName={project.name}
              openImage={openImageModal}
            />
            <ProjectImageModal
              image={selectedImage}
              imageAtt={selectedImageAtt}
              imagePos={imagePosition}
              isOpen={isModalOpen}
              closeImage={closeImageModal}
            />
          </main>
        </>
      )}
    </div>
  );
}

export default Project;
