import { queryOptions } from "@tanstack/react-query";
import { getProjectVideos } from "../queryOptions/videos";

export const createProjectVideosOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["projectVideos", projectName],
    queryFn: () => getProjectVideos(projectName),
  });
};
