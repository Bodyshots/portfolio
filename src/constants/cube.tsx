import * as THREE from "three";

interface CubeFace {
  name: string;
  normal: THREE.Vector3;
  image: string;
  materialIndex: number;
}

const CubeFaces: CubeFace[] = [
  {
    name: "Python",
    normal: new THREE.Vector3(-1, 0, 0),
    image: "pythonFace.avif",
    materialIndex: 0,
  },
  {
    name: "JavaScript",
    normal: new THREE.Vector3(1, 0, 0),
    image: "javascriptFace.avif",
    materialIndex: 1,
  },
  {
    name: "C/C++",
    normal: new THREE.Vector3(0, -1, 0),
    image: "CFace.avif",
    materialIndex: 2,
  },
  {
    name: "Java",
    normal: new THREE.Vector3(0, 1, 0),
    image: "javaFace.avif",
    materialIndex: 3,
  },
  {
    name: "React",
    normal: new THREE.Vector3(0, 0, -1),
    image: "reactFace.avif",
    materialIndex: 4,
  },
  {
    name: "Next.js",
    normal: new THREE.Vector3(0, 0, 1),
    image: "nextjsFace.avif",
    materialIndex: 5,
  },
];

const CubeConstants = Object.freeze({
  DIMENSIONS: {
    WIDTH: 3,
    HEIGHT: 3,
    DEPTH: 3,
  },
  EDGE: {
    COLOR: "--primary",
    LINE_WIDTH: 0.5,
  },
  FACES: CubeFaces,
  FACE_PATH: {
    LIGHT: "/cube/light/",
    DARK: "/cube/dark/",
  },
  FACE_THRESHOLD: 0.7,
  LIGHT: {
    COLOR: {
      LIGHT: "--secondary",
      DARK: "white",
    },
    INTENSITY: 3.19,
  },
  ROTATION: {
    AMPLITUDE: 3, // in degrees
    BASE: {
      X: Math.PI / 8,
      Y: -Math.PI / 5,
      Z: 0,
    },
    SPEED: {
      X: 0,
      Y: 0.75,
      Z: 0,
    },
  },
  VELOCITY: {
    DAMPING: -5, // Multiplied by delta time to reduce velocity over time
    INITIAL: {
      X: 0,
      Y: 0,
    },
    SENSITIVITY: 0.01,
    SMOOTHING: 0.35,
    THRESHOLD: 0.001,
  },
});

export { CubeConstants };
