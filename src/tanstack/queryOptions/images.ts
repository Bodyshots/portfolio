import supabase from "@/config/supabaseClient";
import { type ProjectImage, ProjectImageType } from "@/types";

export const getProjectCoverImages = async (
  projectName: string,
): Promise<ProjectImage[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_IMAGE_DB_NAME)
    .select("*")
    .eq("project_name", projectName)
    .eq("type", ProjectImageType.COVER)
    .order("priority");

  if (error)
    throw new Error(
      `Error fetching cover image for ${projectName}: ${error.message}`,
    );
  return data;
};

export const getProjectGalleryImages = async (
  projectName: string,
): Promise<ProjectImage[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_IMAGE_DB_NAME)
    .select("*")
    .eq("project_name", projectName)
    .eq("type", ProjectImageType.GALLERY)
    .order("priority");

  if (error)
    throw new Error(
      `Error fetching gallery images for ${projectName}: ${error.message}`,
    );
  return data;
};
