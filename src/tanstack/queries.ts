import {
  type Project,
  type ProjectImage,
  ProjectImageType,
  ProjectQueryKey,
  type ProjectTool,
  type ProjectVideo,
  type WorkItem,
  type WorkItemList,
  WorkQueryKey,
} from "@/types";
import { getProject, projectGetter } from "./queryOptions/project";
import { workGetter } from "./queryOptions/work";

export class QueryTable<T> {
  database: string;
  queryFn: (param?: string) => Promise<T>;

  constructor({ database, queryFn }: QueryTable<T>) {
    this.database = database;
    this.queryFn = queryFn;
  }
}
export const QUERY_TABLES = Object.freeze({
  PROJECT: {
    [ProjectQueryKey.PROJECT]: new QueryTable<Project>({
      database: import.meta.env.VITE_PROJECT_DB as string,
      queryFn: (projectName?: string) => getProject(projectName ?? ""),
    }),
    [ProjectQueryKey.PROJECTS]: new QueryTable<Project[]>({
      database: import.meta.env.VITE_PROJECT_DB as string,
      queryFn: () =>
        projectGetter<Project[]>({
          key: ProjectQueryKey.PROJECTS,
        }),
    }),
    [ProjectQueryKey.COVER]: new QueryTable<ProjectImage[]>({
      database: import.meta.env.VITE_IMAGE_DB as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectImage[]>({
          key: ProjectQueryKey.COVER,
          projectName: projectName ?? "",
          imageType: ProjectImageType.COVER,
        }),
    }),
    [ProjectQueryKey.GALLERY]: new QueryTable<ProjectImage[]>({
      database: import.meta.env.VITE_IMAGE_DB as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectImage[]>({
          key: ProjectQueryKey.GALLERY,
          projectName: projectName ?? "",
          imageType: ProjectImageType.GALLERY,
        }),
    }),
    [ProjectQueryKey.TOOLS]: new QueryTable<ProjectTool[]>({
      database: import.meta.env.VITE_TOOL_DB as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectTool[]>({
          key: ProjectQueryKey.TOOLS,
          projectName: projectName ?? "",
        }),
    }),
    [ProjectQueryKey.VIDEOS]: new QueryTable<ProjectVideo[]>({
      database: import.meta.env.VITE_VIDEO_DB as string,
      queryFn: (projectName?: string) =>
        projectGetter<ProjectVideo[]>({
          key: ProjectQueryKey.VIDEOS,
          projectName: projectName ?? "",
        }),
    }),
  },
  WORK: {
    [WorkQueryKey.WORK]: new QueryTable<WorkItem[]>({
      database: import.meta.env.VITE_WORK_DB as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.WORK, workId }),
    }),
    [WorkQueryKey.ACHIEVEMENTS]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_ACHIEVEMENT_DB as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.ACHIEVEMENTS, workId }),
    }),
    [WorkQueryKey.RESPONSIBILITIES]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_RESPONSIBILITY_DB as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.RESPONSIBILITIES, workId }),
    }),
    [WorkQueryKey.TECHNOLOGIES]: new QueryTable<WorkItemList[]>({
      database: import.meta.env.VITE_TECHNOLOGY_DB as string,
      queryFn: (workId?: string) =>
        workGetter({ queryKey: WorkQueryKey.TECHNOLOGIES, workId }),
    }),
  },
});
