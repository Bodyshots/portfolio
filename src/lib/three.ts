import { useLoader } from "@react-three/fiber";
import { type Texture, TextureLoader } from "three";

export function useTextures(images: string[]) {
  return useLoader(TextureLoader, images);
}

export function texturesLoaded(loadedTextures: Texture[]) {
  return loadedTextures.every(Boolean);
}
