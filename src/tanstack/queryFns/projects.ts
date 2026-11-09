import { queryOptions } from "@tanstack/react-query";
import { getProjectByName, getProjects } from "../queryOptions/projects";

export const createProjectsOptions = () => {
  return queryOptions({
    queryKey: ["projects"],
    queryFn: getProjects,
  });
};

export const createProjectNameOptions = (name: string) => {
  return queryOptions({
    queryKey: ["project", name],
    queryFn: () => getProjectByName(name),
  });
};
