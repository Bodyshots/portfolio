interface ProjectImageModalProps {
  title: string;
  image: string;
  imageAtt: string;
  imagePos: {
    top: number;
    left: number;
    width: number;
    height: number;
  };
  isOpen: boolean;
  closeImage: () => void;
}

const ProjectImageModal = ({
  title,
  image,
  imageAtt,
  imagePos,
  isOpen,
  closeImage,
}: ProjectImageModalProps) => {
  return (
    image &&
    imagePos && (
      <>
        <button
          className={`fixed inset-0 bg-black z-50 transition-opacity duration-500 ${
            isOpen ? "opacity-70" : "opacity-0"
          }`}
          onClick={closeImage}
          type="button"
        />

        <button
          className="fixed z-50 transition-all duration-500 ease-out border-0 bg-transparent p-0 text-left"
          style={{
            top: isOpen ? "50%" : `${imagePos.top}px`,
            left: isOpen ? "50%" : `${imagePos.left}px`,
            transform: isOpen ? "translate(-50%, -50%)" : "translate(0, 0)",
            width: isOpen ? "40vw" : `${imagePos.width}px`,
            height: isOpen ? "auto" : `${imagePos.height}px`,
          }}
          onClick={closeImage}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              closeImage();
            }
          }}
          type="button"
          tabIndex={0}
          aria-label="Close image modal"
        >
          <div className="rounded-lg overflow-hidden shadow-2xl h-full max-h-[90vh]">
            <img
              src={image}
              alt={title}
              className={`w-full object-cover transition-all duration-500 ${
                isOpen ? "h-auto max-h-[80vh] object-contain" : "h-full"
              }`}
            />
            <div
              className={`p-6 bg-border transition-opacity duration-500 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="text-base text-muted-foreground m-0">{imageAtt}</p>
            </div>
          </div>
        </button>
      </>
    )
  );
};

export default ProjectImageModal;
