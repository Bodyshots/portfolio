import { useQuery } from "@tanstack/react-query";
import LoadingTools from "@/features/global/Skeletons/LoadingTools";
import { createOptions } from "@/tanstack/queryFns";
import { type ProjectTool, QueryTableType } from "@/types";
import Tool from "../../global/Tool";
import ProjectSection from "../ProjectSection";

const ProjectTools = ({ projectName }: { projectName: string }) => {
  const {
    data: tools,
    isPending,
    isError,
  } = useQuery({
    ...createOptions<ProjectTool[]>({
      query: { queryTable: QueryTableType.PROJECT, queryKey: "projectTools" },
      param: projectName,
    }),
    enabled: Boolean(projectName),
  });

  if (isPending) {
    return (
      <ProjectSection title="Tools & Technologies">
        <LoadingTools />
      </ProjectSection>
    );
  }

  if (isError) {
    return (
      <ProjectSection title="Tools & Technologies" wrapperClassName="my-0">
        <span
          className="mt-4 flex w-full items-center justify-center wrap-break-word text-2xl text-foreground"
          role="alert"
        >
          Failed to load tools
        </span>
      </ProjectSection>
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
