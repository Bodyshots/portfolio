/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_EMAIL: string;
  readonly VITE_PHONE_NUMBER: string;
  readonly VITE_RESUME_URL: string;
  readonly VITE_ANON_KEY: string;
  readonly VITE_PROJECT_TABLE: string;
  readonly VITE_WORK_TABLE: string;
  readonly VITE_IMAGE_TABLE: string;
  readonly VITE_VIDEO_TABLE: string;
  readonly VITE_TOOL_TABLE: string;
  readonly VITE_ACHIEVEMENT_TABLE: string;
  readonly VITE_RESPONSIBILITY_TABLE: string;
  readonly VITE_TECHNOLOGY_TABLE: string;
  readonly VITE_PROJECT_BUCKET: string;
  readonly VITE_VIDEO_FOLDER: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
