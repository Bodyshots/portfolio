import supabase from "@/config/supabaseClient";

interface getProjectVideoProps {
  projectName: string;
  name: string;
}

export const getProjectVideoUrl = ({
  projectName,
  name,
}: getProjectVideoProps) => {
  return supabase.storage
    .from(import.meta.env.VITE_PROJECT_BUCKET)
    .getPublicUrl(`${projectName}/${import.meta.env.VITE_VIDEO_FOLDER}/${name}`)
    .data.publicUrl;
};
