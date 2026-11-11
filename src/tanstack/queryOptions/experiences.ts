import supabase from "@/config/supabaseClient";
import type { WorkItem } from "@/types";

export const getExperiences = async (): Promise<WorkItem[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_WORK_DB_NAME)
    .select();

  if (error) throw new Error(`Error fetching experience: ${error}`);
  return data;
};
