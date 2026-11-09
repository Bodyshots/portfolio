import supabase from "@/config/supabaseClient";
import { resolveActualNameFromUrlSafeName } from "@/lib/utils";
import type { Project } from "@/types";

export const getProjects = async (): Promise<Project[]> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_PROJECT_DB_NAME)
    .select();

  if (error) throw new Error(`Error fetching projects: ${error}`);
  return data;
};

export const getProjectByName = async (
  urlSafeName: string,
): Promise<Project> => {
  const { data, error } = await supabase
    .from(import.meta.env.VITE_PROJECT_DB_NAME)
    .select();

  if (error) {
    throw new Error(`Error fetching projects: ${error.message}`);
  }

  const actualName = resolveActualNameFromUrlSafeName(
    urlSafeName,
    data.map(({ name }) => name),
  );

  if (!actualName) {
    throw new Error(`Could not resolve project name from URL: ${urlSafeName}`);
  }

  const project = data.find(({ name }) => name === actualName);
  if (!project) {
    throw new Error(`Could not find project with name: ${actualName}`);
  }

  return project;
};
