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
  id: number;
  created_at: string;
  project_name: string;
  type: ProjectImageType;
  name: string;
  attribution: string;
  priority: number;
}

export interface ProjectVideo {
  id: number;
  created_at: string;
  project_name: string;
  name: string;
  priority: number;
}
