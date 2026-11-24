import type { PostgrestError } from "@supabase/supabase-js";
import { resolveActualNameFromUrlSafeName } from "@/lib/utils";
import {
  type Project,
  type ProjectImageType,
  type ProjectQueryKey,
  QueryTableType,
} from "@/types";
import { selectFromQueryTable } from "../queries";
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

const projectSelectFromName = async <T>({
  queryKey,
  projectName,
}: ProjectSelectFromEqProps): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
}> => {
  return await selectFromQueryTable({
    queryTable: QueryTableType.PROJECT,
    queryKey,
  }).eq("project_name", projectName);
};

const projectSelectImages = async <T>({
  queryKey,
  projectName,
  imageType,
}: ProjectSelectImagesProps): Promise<{
  data: T[] | null;
  error: PostgrestError | null;
}> => {
  return await selectFromQueryTable({
    queryTable: QueryTableType.PROJECT,
    queryKey,
  })
    .eq("project_name", projectName)
    .eq("type", imageType);
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
        : projectSelectFromName<T>({
            queryKey: key,
            projectName,
          }))
    : await selectFromQueryTable({
        queryTable: QueryTableType.PROJECT,
        queryKey: "projects",
      });

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
    key: "projects",
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
