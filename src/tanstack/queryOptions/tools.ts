import supabase from "@/config/supabaseClient";
import type { ProjectTool } from "@/types";

export const getProjectTools = async (
  projectName: string,
): Promise<ProjectTool[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_TOOL_DB_NAME)
    .select("*")
    .eq("project_name", projectName)
    .order("priority");

  if (error)
    throw new Error(
      `Error fetching videos for ${projectName}: ${error.message}`,
    );
  return data;
};
