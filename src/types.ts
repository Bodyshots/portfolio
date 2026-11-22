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
}

export interface Project {
  id: number;
  created_at: string;
  short_desc: string;
  name: string;
  major: boolean;
  video: string | null;
  long_desc: string;
  tools: string[] | null;
  priority: number;
  github: string | null;
}

export enum ProjectImageType {
  COVER = "cover",
  GALLERY = "gallery",
}

export interface ProjectImage {
  project_name: string;
  type: ProjectImageType;
  name: string;
  created_at: string;
  attribution: string;
  priority: number;
}
