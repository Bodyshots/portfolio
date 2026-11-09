import { useQuery } from "@tanstack/react-query";
import { useLayoutEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ImageConstants } from "@/constants/image";
import ProjectDescription from "@/features/project/ProjectDescription";
import ProjectGallery from "@/features/project/ProjectGallery";
import ProjectHeader from "@/features/project/ProjectHeader";
import ProjectImageModal from "@/features/project/ProjectImageModal";
import ProjectTools from "@/features/project/ProjectTools";
import ProjectVideo from "@/features/project/ProjectVideo";
import { createProjectNameOptions } from "@/tanstack/queryFns/projects";
import Loading from "../Loading";
import NotFound from "../NotFound";

function Project() {
  const { projectName } = useParams<{ projectName: string }>();
  useLayoutEffect(() => {
    if (projectName) window.scrollTo({ top: 0, behavior: "instant" });
  }, [projectName]);

  const {
    data: project,
    isPending,
    error,
  } = useQuery({
    ...createProjectNameOptions(projectName ?? ""),
    enabled: Boolean(projectName),
  });

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

  if (!projectName) return <NotFound />;
  if (isPending) return <Loading />;
  if (error) return <NotFound />;

  return (
    <div className="flex flex-col max-w-full min-h-dvh w-full h-full justify-center align-middle text-center m-auto pt-16">
      <ProjectHeader
        title={project.name}
        shortDesc={project.short_desc}
        ghLink={project.github}
      />

      <div className="max-w-6xl mx-auto px-8 py-8 pt-0">
        <ProjectVideo video={project.video} />
        <ProjectDescription desc={project.long_desc} />
        <ProjectTools tools={project.tools} />
        <ProjectGallery
          images={project.images}
          imageAtts={project.image_atts}
          openImage={openImageModal}
          setImageAtt={setSelectedImageAtt}
        />
        <ProjectImageModal
          image={selectedImage}
          imageAtt={selectedImageAtt}
          imagePos={imagePosition}
          isOpen={isModalOpen}
          closeImage={closeImageModal}
        />
      </div>
    </div>
  );
}

export default Project;
