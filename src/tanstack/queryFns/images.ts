import { queryOptions } from "@tanstack/react-query";
import {
  getProjectCoverImages,
  getProjectGalleryImages,
} from "../queryOptions/images";

export const createProjectGalleryImagesOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["project-gallery-images", projectName],
    queryFn: () => getProjectGalleryImages(projectName),
  });
};

export const createProjectCoverImagesOptions = (projectName: string) => {
  return queryOptions({
    queryKey: ["project-cover-images", projectName],
    queryFn: () => getProjectCoverImages(projectName),
  });
};
