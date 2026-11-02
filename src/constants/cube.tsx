import * as THREE from "three";
import cImg from "@/images/faces/C_face.avif";
import javaImg from "@/images/faces/java_face.avif";
import htmlImg from "@/images/faces/javascript_face.avif";
import nextjsImg from "@/images/faces/nextjs_face.avif";
import pythonImg from "@/images/faces/python_face.avif";
import reactImg from "@/images/faces/react_face.avif";

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
    image: pythonImg,
    materialIndex: 0,
  },
  {
    name: "JavaScript",
    normal: new THREE.Vector3(1, 0, 0),
    image: htmlImg,
    materialIndex: 1,
  },
  {
    name: "C/C++",
    normal: new THREE.Vector3(0, -1, 0),
    image: cImg,
    materialIndex: 2,
  },
  {
    name: "Java",
    normal: new THREE.Vector3(0, 1, 0),
    image: javaImg,
    materialIndex: 3,
  },
  {
    name: "React",
    normal: new THREE.Vector3(0, 0, -1),
    image: reactImg,
    materialIndex: 4,
  },
  {
    name: "Next.js",
    normal: new THREE.Vector3(0, 0, 1),
    image: nextjsImg,
    materialIndex: 5,
  },
];

const CubeConstants = Object.freeze({
  DIMENSIONS: {
    WIDTH: 3,
    HEIGHT: 3,
    DEPTH: 3,
  },
  FACES: CubeFaces,
  FACE_THRESHOLD: 0.7,
  EDGE: {
    COLOR: "--primary",
    LINE_WIDTH: 0.5,
  },
  LIGHT: {
    COLOR: "--secondary",
    INTENSITY: 3.19,
  },
  ROTATION: {
    AMPLITUDE: 3, // in degrees
    BASE: {
      X: Math.PI / 8,
      Y: -Math.PI / 5,
      Z: 0,
    },
    IDLE: {
      X: 0,
      Y: 0.25,
      Z: 0,
    },
  },
});

export { CubeConstants };
