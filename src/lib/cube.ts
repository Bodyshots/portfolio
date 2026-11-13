import { CubeConstants } from "@/constants/cube";

export const getFacePath = (theme: string | undefined) =>
  theme === "dark"
    ? CubeConstants.FACE_PATH.DARK
    : CubeConstants.FACE_PATH.LIGHT;
