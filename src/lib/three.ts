import { useLoader } from "@react-three/fiber";
import { type Texture, TextureLoader } from "three";

const BLACK_TEXTURE_URL =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3Crect width='1' height='1' fill='%23000'/%3E%3C/svg%3E";

class TextureLoaderWithBlackFallback extends TextureLoader {
  override load(
    url: string,
    onLoad?: (texture: Texture<HTMLImageElement>) => void,
    onProgress?: (event: ProgressEvent) => void,
    onError?: (error: unknown) => void,
  ) {
    return super.load(url, onLoad, onProgress, (error) => {
      console.error(
        `Failed to load cube texture "${url}". Using black.`,
        error,
      );
      super.load(BLACK_TEXTURE_URL, onLoad, undefined, (fallbackError) => {
        console.error(
          "Failed to load black cube texture fallback.",
          fallbackError,
        );
        onError?.(fallbackError);
      });
    });
  }
}

export function useTextures(images: string[]) {
  return useLoader(TextureLoader, images);
}

export function useTexturesWithBlackFallback(images: string[]) {
  return useLoader(TextureLoaderWithBlackFallback, images);
}

export function texturesLoaded(loadedTextures: Texture[]) {
  return loadedTextures.every(Boolean);
}
