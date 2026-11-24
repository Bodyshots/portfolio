import { queryOptions } from "@tanstack/react-query";
import type { ProjectQueryKey } from "@/types";
import { QUERY_TABLES } from "../queries";

export const createProjectOptions = <T>({
  key,
  projectName,
}: {
  key: ProjectQueryKey;
  projectName?: string;
}) => {
  const table = QUERY_TABLES.PROJECT[key];
  return queryOptions<T>({
    queryKey: projectName ? [key, projectName] : [key],
    queryFn: () => table.queryFn(projectName) as Promise<T>,
  });
};
