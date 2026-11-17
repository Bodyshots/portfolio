interface ProjectImageModalProps {
  image: string;
  imageAtt: string;
  imagePos: {
    top: number;
    left: number;
    width: number;
    height: number;
  } | null;
  isOpen: boolean;
  closeImage: () => void;
}

const ProjectImageModal = ({
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

        <div
          className="fixed z-50 text-left transition-all duration-500 ease-out"
          style={{
            top: isOpen ? "50%" : `${imagePos.top}px`,
            left: isOpen ? "50%" : `${imagePos.left}px`,
            transform: isOpen ? "translate(-50%, -50%)" : "translate(0, 0)",
            width: isOpen ? "min(90vw, 40rem)" : `${imagePos.width}px`,
            height: isOpen ? "auto" : `${imagePos.height}px`,
          }}
        >
          <div className="rounded-lg overflow-hidden shadow-2xl h-full max-h-[90vh]">
            <img
              src={image}
              alt={imageAtt}
              className={`w-full object-cover transition-all duration-500 ${
                isOpen ? "h-auto max-h-[80vh] object-contain" : "h-full"
              }`}
            />
            <div
              className={`bg-border p-6 transition-opacity duration-500 max-xs:p-2 ${
                isOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <p className="m-0 wrap-break-word text-base text-card-foreground">
                {imageAtt}
              </p>
            </div>
          </div>
        </div>
      </>
    )
  );
};

export default ProjectImageModal;
