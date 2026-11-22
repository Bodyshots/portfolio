import { useQuery } from "@tanstack/react-query";
import LoadingTools from "@/features/global/Skeletons/LoadingTools";
import { createProjectToolsOptions } from "@/tanstack/queryFns/tools";
import Tool from "../../global/Tool";
import ProjectSection from "../ProjectSection";

const ProjectTools = ({ projectName }: { projectName: string }) => {
  const { data: tools, isPending } = useQuery({
    ...createProjectToolsOptions(projectName),
    enabled: Boolean(projectName),
  });

  if (isPending) {
    return (
      <div className="my-6 min-w-0">
        <h2 className="mb-4 wrap-break-word text-3xl text-foreground max-xs:text-xl">
          Tools & Technologies
        </h2>
        <LoadingTools />
      </div>
    );
  }

  return (
    <ProjectSection title="Tools & Technologies">
      <div className="flex w-full min-w-0 flex-wrap justify-center gap-3">
        {tools?.map((tool) => (
          <Tool
            key={tool.tool}
            tool={tool.tool}
            className="min-w-0 max-w-full wrap-break-word text-base"
          />
        ))}
      </div>
    </ProjectSection>
  );
};

export default ProjectTools;
