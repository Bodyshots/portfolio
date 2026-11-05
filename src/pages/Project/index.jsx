import AOS from "aos";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import AnimatePage from "@/components/AnimatePage";
import ProjectDescription from "@/components/ProjectDescription";
import ProjectGallery from "@/components/ProjectGallery";
import ProjectHeader from "@/components/ProjectHeader";
import ProjectImageModal from "@/components/ProjectImageModal";
import ProjectTools from "@/components/ProjectTools";
import ProjectVideo from "@/components/shared/ProjectVideo";
import supabase from "@/config/supabaseClient";
import { ImageConstants } from "@/constants/image";
import { OtherConstants } from "@/constants/other";
import { normTitleHTMLEscape } from "@/lib/utils";
import {
  disableLoading,
  enableLoading,
  resetProject,
  setError,
  setGithubLink,
  setImageAtts,
  setLongDesc,
  setProjImages,
  setProjTitle,
  setProjVid,
  setShortDesc,
  setTools,
  useProjectStore,
} from "@/store/useProjectStore";
import Loading from "../Loading";
import NotFound from "../NotFound";

function Project() {
  const { projName } = useParams();

  const shortDesc = useProjectStore((state) => state.shortDesc);
  const longDesc = useProjectStore((state) => state.longDesc);
  const projVid = useProjectStore((state) => state.projVid);
  const githubLink = useProjectStore((state) => state.githubLink);
  const projTitle = useProjectStore((state) => state.projTitle);
  const projImages = useProjectStore((state) => state.projImages);
  const imageAtts = useProjectStore((state) => state.imageAtts);
  const loading = useProjectStore((state) => state.loading);
  const tools = useProjectStore((state) => state.tools);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedImageAtt, setSelectedImageAtt] = useState("");
  const [imagePosition, setImagePosition] = useState(null);
  const [resolvedProjName, setResolvedProjName] = useState(null);
  const clickedImageRef = useRef(null);

  const openImageModal = (image, event) => {
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
      setSelectedImage(null);
      setImagePosition(null);
      clickedImageRef.current = null;
    }, ImageConstants.DEFAULT_TIMEOUT);
  };

  useEffect(() => {
    enableLoading();
    resetProject();
    setError("");
    AOS.init({ duration: OtherConstants.AOS_DURATION });

    const fetchProj = async () => {
      try {
        const { data, error } = await supabase
          .from(import.meta.env.VITE_PROJECT_DB_NAME)
          .select();
        if (!isCurrent) return;

        if (error) throw error;

        const proj = data?.find(
          (project) => normTitleHTMLEscape(project.name) === projName,
        );

        if (proj) {
          setProjTitle(proj.name);
          setShortDesc(proj.short_desc);
          setLongDesc(proj.long_desc);
          setProjVid(proj.video);
          setGithubLink(proj.github);
          setProjImages(proj.images);
          setImageAtts(proj.image_atts);
          setTools(proj.tools);
        }
      } catch (error) {
        if (!isCurrent) return;

        resetProject();
        setError(error instanceof Error ? error.message : String(error));
        console.error(error);
      } finally {
        if (isCurrent) {
          setResolvedProjName(projName);
          disableLoading();
        }
      }
    };

    let isCurrent = true;
    void fetchProj();

    return () => {
      isCurrent = false;
      disableLoading();
    };
  }, [projName]);

  if (loading || resolvedProjName !== projName) return <Loading />;

  return projTitle ? (
    <AnimatePage>
      <div className="flex flex-col max-w-full min-h-dvh w-full h-full justify-center align-middle text-center m-auto pt-16">
        <ProjectHeader
          title={projTitle}
          shortDesc={shortDesc}
          ghLink={githubLink}
        />

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 pt-0">
          <ProjectVideo video={projVid} />
          <ProjectDescription desc={longDesc} />
          <ProjectTools tools={tools} />
          <ProjectGallery
            images={projImages}
            imageAtts={imageAtts}
            openImage={openImageModal}
            setImageAtt={setSelectedImageAtt}
          />
          <ProjectImageModal
            title={projTitle}
            image={selectedImage}
            imageAtt={selectedImageAtt}
            imagePos={imagePosition}
            isOpen={isModalOpen}
            closeImage={closeImageModal}
          />
        </div>
      </div>
    </AnimatePage>
  ) : (
    <NotFound />
  );
}

export default Project;
