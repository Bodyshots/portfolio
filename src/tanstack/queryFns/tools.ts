import { queryOptions } from "@tanstack/react-query";
import { getProjectTools } from "../queryOptions/tools";

export const createProjectToolsOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["projectTools", projectName],
    queryFn: () => getProjectTools(projectName),
  });
};
