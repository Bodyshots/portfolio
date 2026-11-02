import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import * as THREE from "three";
import { CubeConstants } from "@/constants/cube";
import { texturesLoaded, useTextures } from "@/lib/three";
import "../globals.css";

const CubeThreeJS = ({ cubeRef, handleFaceChange, setIsLoaded }) => {
  const { camera } = useThree();
  const isInteracting = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  let maxDot = -Infinity;

  // Dimensions
  const cubeDimensions = CubeConstants.DIMENSIONS;

  // Edges
  const cubeEdges = CubeConstants.EDGE;

  // Lights
  const cubeLights = CubeConstants.LIGHT;

  // Faces
  let closestFace = null;
  const faces = CubeConstants.FACES;
  const loadedTextures = useTextures(faces.map((face) => face.image));

  // Rotation
  const cubeRotation = CubeConstants.ROTATION;
  const rotationAmplitude = THREE.MathUtils.degToRad(cubeRotation.AMPLITUDE);
  const baseRotations = cubeRotation.BASE;

  // Colors
  const themeColors = getComputedStyle(document.documentElement);
  const edgeColor = themeColors.getPropertyValue(cubeEdges.COLOR);
  const lightColor = themeColors.getPropertyValue(cubeLights.COLOR);

  const getIdleRotation = (elapsedTime, speed) =>
    Math.sin(elapsedTime * speed) * rotationAmplitude;

  const checkVisibleFace = () => {
    const cube = cubeRef.current;
    if (!cube) return;

    const matrix = new THREE.Matrix4();
    cube.updateMatrixWorld();
    matrix.copy(cube.matrixWorld);

    const cameraDirection = new THREE.Vector3();
    camera.getWorldDirection(cameraDirection);

    for (const face of faces) {
      const worldNormal = face.normal.clone().applyMatrix4(matrix).normalize();
      const dotProduct = cameraDirection.dot(worldNormal);
      if (dotProduct > maxDot || dotProduct >= CubeConstants.FACE_THRESHOLD) {
        maxDot = dotProduct;
        closestFace = face.name;
      }
    }
    handleFaceChange(closestFace);
  };

  useFrame(({ clock }) => {
    const cube = cubeRef.current;
    if (!cube) return;

    if (!prefersReducedMotion && !isInteracting.current) {
      for (const [axis, base, speed] of [
        ["x", baseRotations.X, cubeRotation.IDLE.X],
        ["y", baseRotations.Y, cubeRotation.IDLE.Y],
        ["z", baseRotations.Z, cubeRotation.IDLE.Z],
      ]) {
        cube.rotation[axis] = base + getIdleRotation(clock.elapsedTime, speed);
      }
    }

    checkVisibleFace();
  });

  useEffect(() => {
    setIsLoaded(texturesLoaded(loadedTextures));
  }, [loadedTextures, setIsLoaded]);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        onStart={() => (isInteracting.current = true)}
        onEnd={() => (isInteracting.current = false)}
      />
      <ambientLight
        intensity={CubeConstants.LIGHT.INTENSITY}
        color={lightColor}
      />
      <mesh
        ref={cubeRef}
        rotation={[baseRotations.X, baseRotations.Y, baseRotations.Z]}
      >
        <boxGeometry
          args={[
            cubeDimensions.WIDTH,
            cubeDimensions.HEIGHT,
            cubeDimensions.DEPTH,
          ]}
        />
        {faces.map((face, index) => (
          <meshStandardMaterial
            key={face.name}
            map={loadedTextures[index]}
            attach={`material-${face.materialIndex}`}
          />
        ))}
        <Edges color={edgeColor} lineWidth={cubeEdges.LINE_WIDTH} />
      </mesh>
    </>
  );
};

const HomeCube = () => {
  const cubeRef = useRef();
  const [faceVisible, setFaceVisible] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handleFaceChange = (face) => {
    if (face !== faceVisible && face !== null) {
      setFaceVisible(face);
    }
  };

  return (
    <div className="flex justify-center items-center flex-col flex-nowrap">
      <div className="relative size-[5.5em]">
        <div
          aria-hidden={isLoaded}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            isLoaded ? "pointer-events-none opacity-0" : "opacity-100"
          }`}
        >
          <RingLoader
            color="currentColor"
            cssOverride={{ color: "var(--color-secondary-foreground)" }}
          />
        </div>
        <Canvas className="transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
          <CubeThreeJS
            cubeRef={cubeRef}
            handleFaceChange={handleFaceChange}
            setIsLoaded={setIsLoaded}
          />
        </Canvas>
      </div>
      <div className="mt-[-0.2em] flex flex-col text-[50px] text-primary-foreground [-webkit-text-stroke-color:var(--accent)] [-webkit-text-stroke-width:0.65px]">
        {faceVisible || <span style={{ opacity: 0.5 }}>Loading…</span>}
      </div>
    </div>
  );
};

export default HomeCube;
