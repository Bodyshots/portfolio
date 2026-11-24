export interface WorkItem {
  id: number;
  created_at: string;
  title: string | null;
  years: string | null;
  company: string | null;
  location: string | null;
  description: string | null;
  responsibilities: string[] | null;
  achievements: string[] | null;
  technologies: string[] | null;
  team_size: string | null;
  priority: number | null;
}

// See: Constant object with a derived union type
export const ProjectQueryKey = {
  PROJECT: "project",
  PROJECTS: "projects",
  COVER: "projectCover",
  GALLERY: "projectGallery",
  TOOLS: "projectTools",
  VIDEOS: "projectVideos",
} as const;
export type ProjectQueryKey =
  (typeof ProjectQueryKey)[keyof typeof ProjectQueryKey];

export const WorkQueryKey = {
  WORK: "work",
  RESPONSIBILITIES: "workResponsibilities",
  TECHNOLOGIES: "workTechnologies",
  ACHIEVEMENTS: "workAchievements",
} as const;

export type WorkQueryKey = (typeof WorkQueryKey)[keyof typeof WorkQueryKey];
export type WorkItemListType = Exclude<WorkQueryKey, typeof WorkQueryKey.WORK>;

export type TableQueryKey = ProjectQueryKey | WorkQueryKey;
export interface WorkItemList {
  id: number;
  created_at: string;
  project_id: number;
  type: WorkItemListType;
  content: string;
}

export interface Project {
  id: number;
  created_at: string;
  short_desc: string;
  name: string;
  major: boolean;
  long_desc: string;
  priority: number;
  github: string | null;
}

export enum ProjectImageType {
  COVER = "cover",
  GALLERY = "gallery",
}

export enum QueryTableType {
  WORK = "work",
  PROJECT = "project",
}

export interface ProjectImage {
  id: number;
  created_at: string;
  project_name: string;
  type: ProjectImageType;
  name: string;
  attribution: string;
  priority: number | null;
}

export interface ProjectVideo {
  id: number;
  created_at: string;
  project_name: string;
  name: string;
  priority: number | null;
}

export interface ProjectTool {
  id: number;
  created_at: string;
  project_name: string;
  tool: string;
  priority: number | null;
}
