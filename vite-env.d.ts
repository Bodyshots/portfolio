/// <reference types="vite/client" />
/// <reference types="vite/types/importMeta.d.ts" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string;
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
  readonly VITE_EMAIL: string;
  readonly VITE_GOOGLEMAPS_URL: string;
  readonly VITE_RESUME_URL: string;
  readonly VITE_ANON_KEY: string;
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
