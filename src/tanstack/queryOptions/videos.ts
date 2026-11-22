import supabase from "@/config/supabaseClient";
import type { ProjectVideo } from "@/types";

export const getProjectVideos = async (
  projectName: string,
): Promise<ProjectVideo[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_VIDEO_DB_NAME)
    .select("*")
    .eq("project_name", projectName)
    .order("priority");

  if (error)
    throw new Error(
      `Error fetching videos for ${projectName}: ${error.message}`,
    );
  return data;
};
