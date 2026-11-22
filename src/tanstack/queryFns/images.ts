import { queryOptions } from "@tanstack/react-query";
import {
  getProjectCoverImages,
  getProjectGalleryImages,
} from "../queryOptions/images";

export const createProjectGalleryImagesOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["projectGalleryImages", projectName],
    queryFn: () => getProjectGalleryImages(projectName),
  });
};

export const createProjectCoverImagesOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["projectCoverImages", projectName],
    queryFn: () => getProjectCoverImages(projectName),
  });
};
