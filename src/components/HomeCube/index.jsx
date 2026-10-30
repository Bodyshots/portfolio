import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { Edges, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { CubeConstants } from "@/constants/cube";
import "../globals.css";

const CubeThreeJS = ({ cubeRef, handleFaceChange, handleLoadingDone }) => {
  const { camera } = useThree();
  const isInteracting = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  let maxDot = -Infinity;
  let closestFace = null;
  const faces = CubeConstants.FACES;

  const cubeRotation = CubeConstants.ROTATION;
  const rotationAmplitude = THREE.MathUtils.degToRad(cubeRotation.AMPLITUDE);
  const baseRotations = cubeRotation.BASE;

  const themeColors = getComputedStyle(document.documentElement);
  const edgeColor = themeColors.getPropertyValue(CubeConstants.EDGE.COLOR);
  const lightColor = themeColors.getPropertyValue(CubeConstants.LIGHT.COLOR);

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
      cube.rotation.y =
        baseRotations.Y +
        Math.sin(clock.elapsedTime * 0.25) * rotationAmplitude;
    }

    checkVisibleFace();
  });

  const textures = useLoader(
    TextureLoader,
    faces.map((face) => face.image),
  );

  useEffect(() => {
    if (textures.every(Boolean)) handleLoadingDone();
  }, [textures, handleLoadingDone]);

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        onStart={() => {
          isInteracting.current = true;
        }}
        onEnd={() => {
          isInteracting.current = false;
        }}
      />
      <ambientLight
        intensity={CubeConstants.LIGHT.INTENSITY}
        color={lightColor}
      />
      <mesh
        ref={cubeRef}
        rotation={[baseRotations.X, baseRotations.Y, baseRotations.Z]}
      >
        <boxGeometry args={[3, 3, 3]} />
        {faces.map((face, index) => (
          <meshStandardMaterial
            key={face.name}
            map={textures[index]}
            attach={`material-${face.materialIndex}`}
          />
        ))}
        <Edges color={edgeColor} lineWidth={0.5} />
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
  const handleLoadingDone = useCallback(() => {
    setIsLoaded(true);
  }, []);

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
        <Canvas className="transition-transform duration-150 ease-out hover:-translate-y-0.5 motion-reduce:transform-none motion-reduce:transition-none">
          <CubeThreeJS
            cubeRef={cubeRef}
            handleFaceChange={handleFaceChange}
            handleLoadingDone={handleLoadingDone}
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
