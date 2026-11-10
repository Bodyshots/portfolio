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
    <div className="mb-12">
      <h2 className="text-3xl text-secondary-foreground my-8">
        Project Gallery
      </h2>
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
    </div>
  );
};

export default ProjectGallery;
