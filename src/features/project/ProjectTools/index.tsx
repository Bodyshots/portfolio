import Tool from "../../global/Tool";
import ProjectSection from "../ProjectSection";

interface ProjectToolsProps {
  tools: string[] | null;
}

const ProjectTools = ({ tools }: ProjectToolsProps) => {
  return (
    <ProjectSection title="Tools & Technologies">
      <div className="flex w-full min-w-0 flex-wrap justify-center gap-3">
        {tools?.map((tool) => (
          <Tool
            key={tool}
            tool={tool}
            className="min-w-0 max-w-full wrap-break-word text-base"
          />
        ))}
      </div>
    </ProjectSection>
  );
};

export default ProjectTools;
