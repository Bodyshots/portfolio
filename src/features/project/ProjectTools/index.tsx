import Tool from "../../global/Tool";
import ProjectSection from "../ProjectSection";

interface ProjectToolsProps {
  tools: string[] | null;
}

const ProjectTools = ({ tools }: ProjectToolsProps) => {
  return (
    <ProjectSection title="Tools & Technologies">
      <div className="flex flex-wrap justify-center gap-3">
        {tools?.map((tool) => (
          <Tool key={tool} tool={tool} className="text-md" />
        ))}
      </div>
    </ProjectSection>
  );
};

export default ProjectTools;
