import type { PostgrestError } from "@supabase/supabase-js";
import supabase from "@/config/supabaseClient";
import { resolveActualNameFromUrlSafeName } from "@/lib/utils";
import { type Project, type ProjectImageType, ProjectQueryKey } from "@/types";
import { QUERY_TABLES } from "../queries";
import { dataOrThrow } from "./error";

interface ProjectSelectFromEqProps {
  queryKey: ProjectQueryKey;
  projectName: string;
}

interface ProjectSelectImagesProps {
  queryKey: ProjectQueryKey;
  projectName: string;
  imageType: ProjectImageType;
}

interface ProjectGetterProps {
  key: ProjectQueryKey;
  projectName?: string;
  imageType?: ProjectImageType;
}

const projectSelectAllFrom = (queryKey: ProjectQueryKey) => {
  return supabase.from(QUERY_TABLES.PROJECT[queryKey].database).select("*");
};

const projectSelectAllFromEq = async <T>({
  queryKey,
  projectName,
}: ProjectSelectFromEqProps): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
}> => {
  return await projectSelectAllFrom(queryKey)
    .eq("project_name", projectName)
    .order("priority");
};

const projectSelectImages = async <T>({
  queryKey,
  projectName,
  imageType,
}: ProjectSelectImagesProps): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
}> => {
  return await projectSelectAllFrom(queryKey)
    .eq("project_name", projectName)
    .eq("type", imageType)
    .order("priority");
};

export const projectGetter = async <T>({
  key,
  projectName,
  imageType,
}: ProjectGetterProps): Promise<T> => {
  const result = projectName
    ? await (imageType
        ? projectSelectImages<T>({
            queryKey: key,
            projectName,
            imageType,
          })
        : projectSelectAllFromEq<T>({
            queryKey: key,
            projectName,
          }))
    : await projectSelectAllFrom(ProjectQueryKey.PROJECTS).order("priority");

  return dataOrThrow({
    data: result.data ?? [],
    error: result.error,
    errorMsg: projectName
      ? `Error fetching ${key}s for ${projectName}`
      : "Error fetching projects",
  }) as T;
};

export const getProject = async (projectName: string): Promise<Project> => {
  const data = await projectGetter<Project[]>({
    key: ProjectQueryKey.PROJECTS,
  });

  const actualName = resolveActualNameFromUrlSafeName(
    projectName,
    data.map(({ name }) => name),
  );

  if (!actualName) {
    throw new Error(`Could not resolve project name from ${projectName}`);
  }

  const project = data.find(({ name }) => name === actualName);
  if (!project) {
    throw new Error(`Could not find project with name: ${actualName}`);
  }

  return project;
};
