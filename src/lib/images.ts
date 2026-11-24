import supabase from "@/config/supabaseClient";
import { type ProjectImage, ProjectImageType } from "@/models";

interface getProjectImageUrlProps {
  projectName: string;
  imageType: ProjectImageType;
  name: string;
}

export const getProjectImageUrl = ({
  projectName,
  imageType,
  name,
}: getProjectImageUrlProps): string => {
  return supabase.storage
    .from(import.meta.env.VITE_PROJECT_BUCKET)
    .getPublicUrl(`${projectName}/${imageType}/${name}`).data.publicUrl;
};

export const getProjectCoverUrl = (images: ProjectImage[]) => {
  const coverImgs = images.filter((img) => img.type === ProjectImageType.COVER);

  if (coverImgs.length === 0) return null;

  return getProjectImageUrl({
    projectName: coverImgs[0].project_name,
    imageType: ProjectImageType.COVER,
    name: coverImgs[0].name,
  });
};
