import "./project.css";
import "../../components/globals.css";
import AOS from "aos";
import AnimatePage from "../../components/AnimatePage";
import "aos/dist/aos.css";
import { useEffect, useRef, useState } from "react";
import { IoLogoGithub } from "react-icons/io";
import { useParams } from "react-router-dom";
import ProjectVideo from "../../components/shared/ProjectVideo";
import supabase from "../../config/supabaseClient";
import { ImageConstants } from "../../constants/image";
import { OtherConstants } from "../../constants/other";
import { normTitleHTMLEscape } from "../../lib/utils";
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
} from "../../store/useProjectStore";
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
        const { data, error } = await supabase.from("Projects").select();
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
      <div className="projectContainer flex flex-col max-w-full min-h-dvh w-full h-full justify-center align-middle text-center m-auto pt-16">
        {/* Header */}
        <div className="border-b-2 bg-accent-light-beige rounded-lg">
          <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pb-0">
            <h1 className="font-bold my-8 text-secondary-foreground">
              {projTitle}
            </h1>
            <p className="text-lg lg:text-xl my-8 text-muted-foreground">
              {shortDesc}
            </p>

            <div className="flex flex-wrap gap-4 justify-center my-8">
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="projectGitLink inline-flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all hover:scale-105 bg-secondary-foreground p-4 shadow-md hover:white hover:bg-primary-medium hover:transition-all hover:duration-100"
                >
                  <IoLogoGithub className="w-5 h-5" />
                  <span>View on GitHub</span>
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12 pt-0">
          {/* Video Section - Only show if video exists */}
          {projVid && <div className="mb-16">{ProjectVideo(projVid)}</div>}

          {/* Description */}
          {longDesc ? (
            <div className="mb-12">
              <h2 className="font-bold mb-6 text-secondary-foreground py-0">
                About This Project
              </h2>
              <div className="pt-4 text-left">
                <p className="text-lg leading-relaxed text-muted-foreground m-0">
                  {longDesc}
                </p>
              </div>
            </div>
          ) : (
            <div className="mb-12">
              <h2 className="font-bold mb-6 text-secondary-foreground py-4 pt-0">
                About This Project
              </h2>
              <span className="text-lg text-muted-foreground">
                No long description available.
              </span>
            </div>
          )}

          {/* Tools & Technologies */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4 text-secondary-foreground">
              Tools & Technologies
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {tools.map((tool) => (
                <span
                  key={crypto.randomUUID()}
                  className="text-secondary-foreground inline-flex items-center gap-2 px-4 py-2 rounded-full font-medium bg-accent-very-light-beige border-2 border-accent shadow-sm"
                >
                  <span>{tool}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Image Gallery */}
          {projImages && (
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-secondary-foreground">
                Project Gallery
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                {projImages.map((image, index) => (
                  <button
                    key={crypto.randomUUID()}
                    className="rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-105 border-accent"
                    onClick={(e) => {
                      openImageModal(image, e);
                      setSelectedImageAtt(imageAtts[index]);
                    }}
                    type="button"
                  >
                    <img
                      src={image}
                      alt={imageAtts[index]}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-4 bg-border">
                      <p className="text-sm text-muted-foreground m-0">
                        {imageAtts[index]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Image Modal */}
          {selectedImage && imagePosition && (
            <>
              <button
                className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${
                  isModalOpen ? "opacity-70" : "opacity-0"
                }`}
                onClick={closeImageModal}
                type="button"
              />

              <button
                className="fixed z-50 transition-all duration-500 ease-out border-0 bg-transparent p-0 text-left"
                style={{
                  top: isModalOpen ? "50%" : `${imagePosition.top}px`,
                  left: isModalOpen ? "50%" : `${imagePosition.left}px`,
                  transform: isModalOpen
                    ? "translate(-50%, -50%)"
                    : "translate(0, 0)",
                  width: isModalOpen ? "40vw" : `${imagePosition.width}px`,
                  height: isModalOpen ? "auto" : `${imagePosition.height}px`,
                }}
                onClick={closeImageModal}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    closeImageModal();
                  }
                }}
                type="button"
                tabIndex={0}
                aria-label="Close image modal"
              >
                <div className="rounded-lg overflow-hidden shadow-2xl h-full max-h-[90vh]">
                  <img
                    src={selectedImage}
                    alt={projTitle}
                    className={`w-full object-cover transition-all duration-500 ${
                      isModalOpen
                        ? "h-auto max-h-[80vh] object-contain"
                        : "h-full"
                    }`}
                  />
                  <div
                    className={`p-6 bg-border transition-opacity duration-500 ${
                      isModalOpen ? "opacity-100" : "opacity-0"
                    }`}
                  >
                    <p className="text-base text-muted-foreground m-0">
                      {selectedImageAtt}
                    </p>
                  </div>
                </div>
              </button>
            </>
          )}
        </div>
      </div>
    </AnimatePage>
  ) : (
    <NotFound />
  );
}

export default Project;
