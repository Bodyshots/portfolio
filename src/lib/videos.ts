import supabase from "@/config/supabaseClient";

interface getProjectVideoProps {
  projectName: string;
  name: string;
}

// Assuming only one video
export const getProjectVideoUrl = ({
  projectName,
  name,
}: getProjectVideoProps) => {
  return supabase.storage
    .from(import.meta.env.VITE_PROJECT_BUCKET)
    .getPublicUrl(
      `${projectName}/${import.meta.env.VITE_VIDEOS_FOLDER}/${name}`,
    ).data.publicUrl;
};

// export
