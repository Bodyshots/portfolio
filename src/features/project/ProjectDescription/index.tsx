import { useProjectStore } from "@/store/useProjectStore";

// TODO: Loading state for description
const ProjectDescription = () => {
  const desc = useProjectStore((state) => state.selectedProject)?.long_desc;

  return (
    <div className="my-8 mt-2">
      <h2 className="mb-6 text-secondary-foreground py-0 text-3xl">
        About This Project
      </h2>
      <p
        className={`px-16 text-lg leading-relaxed text-muted-foreground m-0 ${desc ? "text-left" : "text-center"}`}
      >
        {desc ? desc : "No long description available"}
      </p>
    </div>
  );
};

export default ProjectDescription;
