import { useProjectStore } from "@/store/useProjectStore";
import ProjectTool from "./ProjectTool";

// TODO: Loading state
const ProjectTools = () => {
  const tools = useProjectStore((store) => store.selectedProject?.tools);

  return (
    <div className="my-6">
      <h2 className="text-3xl mb-4 text-secondary-foreground">
        Tools & Technologies
      </h2>
      <div className="flex flex-wrap justify-center gap-3">
        {tools?.map((tool) => (
          <ProjectTool key={tool} tool={tool} />
        ))}
      </div>
    </div>
  );
};

export default ProjectTools;
