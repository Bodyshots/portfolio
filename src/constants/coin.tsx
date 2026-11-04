import * as THREE from "three";
import sideImg from "@/images/circumference.avif";
import faceImg from "@/images/headshot.avif";

interface CoinTexture {
  name: string;
  image: string;
  materialIndex: number;
  wrapS?: THREE.Wrapping;
  repeat?: [number, number];
  offset?: [number, number];
}

const CoinTextures: CoinTexture[] = [
  {
    name: "side",
    image: sideImg,
    materialIndex: 0,
    wrapS: THREE.RepeatWrapping,
    repeat: [30, 0],
  },
  {
    name: "heads",
    image: faceImg,
    materialIndex: 1,
    repeat: [1, -1],
    offset: [0, 1],
  },
  {
    name: "tails",
    image: faceImg,
    materialIndex: 2,
    repeat: [1, 1],
    offset: [0, 0],
  },
];

const CoinConstants = Object.freeze({
  POLAR_ANGLE: {
    // Constrains camera movement (curr: only in the horizontal plane)
    MIN: Math.PI / 2,
    MAX: Math.PI / 2,
  },
  GEOMETRY: {
    RADIUS_TOP: 3,
    RADIUS_BOTTOM: 3,
    HEIGHT: 0.25,
    RADIAL_SEGMENTS: 100,
  },
  ROTATION: {
    AMPLITUDE: 60, // in degrees
    BASE: {
      X: 270,
      Y: 90,
      Z: 0,
    },
    WOBBLE: {
      X: 0.1,
      Z: 0.1,
    },
    SPEED: {
      X: 0,
      Y: 0.1,
      Z: 0,
    },
  },
  TEXTURES: CoinTextures,
});

export { CoinConstants };
