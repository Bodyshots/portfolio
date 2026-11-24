import supabase from "@/config/supabaseClient";
import {
  type Project,
  type ProjectImage,
  ProjectImageType,
  ProjectQueryKey,
  type ProjectTool,
  type ProjectVideo,
  QueryTableType,
  type WorkItem,
  type WorkItemList,
  WorkQueryKey,
} from "@/models";
import { getProject, projectGetter } from "./queryOptions/project";
import { workGetter } from "./queryOptions/work";

class QueryTable<T> {
  database: string;
  queryFn: (param?: string) => Promise<T>;

  constructor({ database, queryFn }: QueryTable<T>) {
    this.database = database;
    this.queryFn = queryFn;
  }
}

type ProjectQueryTypes = {
  [ProjectQueryKey.PROJECT]: Project;
  [ProjectQueryKey.PROJECTS]: Project[];
  [ProjectQueryKey.COVER]: ProjectImage[];
  [ProjectQueryKey.GALLERY]: ProjectImage[];
  [ProjectQueryKey.TOOLS]: ProjectTool[];
  [ProjectQueryKey.VIDEOS]: ProjectVideo[];
};

type WorkQueryTypes = {
  [WorkQueryKey.WORK]: WorkItem[];
  [WorkQueryKey.ACHIEVEMENTS]: WorkItemList[];
  [WorkQueryKey.RESPONSIBILITIES]: WorkItemList[];
  [WorkQueryKey.TECHNOLOGIES]: WorkItemList[];
};

type QueryTableMap<T> = {
  [K in keyof T]: QueryTable<T[K]>;
};

type QueryTables = {
  PROJECT: QueryTableMap<ProjectQueryTypes>;
  WORK: QueryTableMap<WorkQueryTypes>;
};

export const QUERY_TABLES: QueryTables = Object.freeze({
  PROJECT: {
    [ProjectQueryKey.PROJECT]: new QueryTable<Project>({
      database: import.meta.env.VITE_PROJECT_TABLE as string,
      queryFn: (projectName?: string) => getProject(projectName ?? ""),
    }),
    [ProjectQueryKey.PROJECTS]: new QueryTable<Project[]>({
      database: import.meta.env.VITE_PROJECT_TABLE as string,
      queryFn: () =>
        projectGetter<Project[]>({
          key: ProjectQueryKey.PROJECTS,
        }),
    }),
    [ProjectQueryKey.COVER]: new QueryTable<ProjectImage[]>({
      database: import.meta.env.VITE_IMAGE_TABLE as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectImage[]>({
          key: ProjectQueryKey.COVER,
          projectName: projectName ?? "",
          imageType: ProjectImageType.COVER,
        }),
    }),
    [ProjectQueryKey.GALLERY]: new QueryTable<ProjectImage[]>({
      database: import.meta.env.VITE_IMAGE_TABLE as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectImage[]>({
          key: ProjectQueryKey.GALLERY,
          projectName: projectName ?? "",
          imageType: ProjectImageType.GALLERY,
        }),
    }),
    [ProjectQueryKey.TOOLS]: new QueryTable<ProjectTool[]>({
      database: import.meta.env.VITE_TOOL_TABLE as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectTool[]>({
          key: ProjectQueryKey.TOOLS,
          projectName: projectName ?? "",
        }),
    }),
    [ProjectQueryKey.VIDEOS]: new QueryTable<ProjectVideo[]>({
      database: import.meta.env.VITE_VIDEO_TABLE as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectVideo[]>({
          key: ProjectQueryKey.VIDEOS,
          projectName: projectName ?? "",
        }),
    }),
  },
  WORK: {
    [WorkQueryKey.WORK]: new QueryTable<WorkItem[]>({
      database: import.meta.env.VITE_WORK_TABLE as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.WORK, workId }),
    }),
    [WorkQueryKey.ACHIEVEMENTS]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_ACHIEVEMENT_TABLE as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.ACHIEVEMENTS, workId }),
    }),
    [WorkQueryKey.RESPONSIBILITIES]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_RESPONSIBILITY_TABLE as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.RESPONSIBILITIES, workId }),
    }),
    [WorkQueryKey.TECHNOLOGIES]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_TECHNOLOGY_TABLE as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.TECHNOLOGIES, workId }),
    }),
  },
});

export type GetQueryTableProps =
  | {
      queryTable: QueryTableType.PROJECT;
      queryKey: ProjectQueryKey;
    }
  | {
      queryTable: QueryTableType.WORK;
      queryKey: WorkQueryKey;
    };

export const getQueryTable = ({ queryTable, queryKey }: GetQueryTableProps) => {
  switch (queryTable) {
    case QueryTableType.PROJECT:
      return QUERY_TABLES.PROJECT[queryKey];
    case QueryTableType.WORK:
      return QUERY_TABLES.WORK[queryKey];
  }
};

export const selectFromQueryTable = (props: GetQueryTableProps) => {
  const table = getQueryTable(props);
  return supabase.from(table.database).select("*").order("priority");
};
