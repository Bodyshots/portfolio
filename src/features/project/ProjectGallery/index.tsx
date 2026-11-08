import { useProjectStore } from "@/store/useProjectStore";

interface ProjectGalleryProps {
  openImage: (image: string, e: React.MouseEvent<HTMLButtonElement>) => void;
  setImageAtt: (imageAtt: string) => void;
}

const ProjectGallery = ({ openImage, setImageAtt }: ProjectGalleryProps) => {
  const project = useProjectStore((state) => state.selectedProject);
  const images = project?.images;
  const image_atts = project?.image_atts;

  return (
    <div className="mb-12">
      <h2 className="text-3xl text-secondary-foreground my-8">
        Project Gallery
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
        {images?.map((image, index) => (
          <button
            key={crypto.randomUUID()}
            className="rounded-lg overflow-hidden shadow-lg border-2 cursor-pointer transition-transform hover:scale-105 border-accent"
            onClick={(e) => {
              openImage(image, e);
              setImageAtt(image_atts?.[index] ?? "");
            }}
            type="button"
          >
            <img
              src={image}
              alt={image_atts?.[index] ?? ""}
              className="w-full h-64 object-cover"
            />
            <div className="p-4 bg-border">
              <p className="text-sm text-muted-foreground m-0">
                {image_atts?.[index] ?? ""}
              </p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProjectGallery;
