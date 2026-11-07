import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { RingLoader } from "react-spinners";
import * as THREE from "three";
import { CubeConstants } from "@/constants/cube";
import { texturesLoaded, useTextures } from "@/lib/three";

interface CubeDrag {
  pointerId: number;
  x: number;
  y: number;
  time: number;
  lastAppliedTime: number;
  deltaX: number;
  deltaY: number;
  started: boolean;
}

interface CubeThreeJSProps {
  cubeRef: RefObject<THREE.Mesh | null>;
  dragRef: RefObject<CubeDrag | null>;
  handleFaceChange: (face: string | null) => void;
  setIsLoaded: Dispatch<SetStateAction<boolean>>;
}

const CubeThreeJS = ({
  cubeRef,
  dragRef,
  handleFaceChange,
  setIsLoaded,
}: CubeThreeJSProps) => {
  const dragGroupRef = useRef<THREE.Group | null>(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  let maxDot = -Infinity;

  // Camera
  const { camera } = useThree();

  // Dimensions
  const cubeDimensions = CubeConstants.DIMENSIONS;

  // Edges
  const cubeEdges = CubeConstants.EDGE;

  // Lights
  const cubeLights = CubeConstants.LIGHT;

  // Faces
  let closestFace: string | null = null;
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

  // Velocity
  const dragSensitivity = CubeConstants.VELOCITY.SENSITIVITY;
  const cubeVelocity = CubeConstants.VELOCITY;
  const dragVelocity = useRef({
    x: cubeVelocity.INITIAL.X,
    y: cubeVelocity.INITIAL.Y,
  });

  const resetVelocity = () => {
    dragVelocity.current.x = cubeVelocity.INITIAL.X;
    dragVelocity.current.y = cubeVelocity.INITIAL.Y;
  };

  const updateDragVelocity = (
    deltaX: number,
    deltaY: number,
    elapsedTime: number,
  ) => {
    dragVelocity.current.x = THREE.MathUtils.lerp(
      dragVelocity.current.x,
      (deltaX * dragSensitivity) / elapsedTime,
      CubeConstants.VELOCITY.SMOOTHING,
    );
    dragVelocity.current.y = THREE.MathUtils.lerp(
      dragVelocity.current.y,
      (deltaY * dragSensitivity) / elapsedTime,
      CubeConstants.VELOCITY.SMOOTHING,
    );
  };

  const applyDamping = (delta: number) => {
    const damping = Math.exp(cubeVelocity.DAMPING * delta);
    dragVelocity.current.x *= damping;
    dragVelocity.current.y *= damping;
  };

  const getIdleRotation = (elapsedTime: number, speed: number) =>
    Math.sin(elapsedTime * speed) * rotationAmplitude;

  const updateRotation = (
    horizontalRotation: number,
    verticalRotation: number,
  ) => {
    const group = dragGroupRef.current;
    if (!group) return;

    const horizontalQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(0, 1, 0),
      horizontalRotation,
    );
    const verticalQuaternion = new THREE.Quaternion().setFromAxisAngle(
      new THREE.Vector3(1, 0, 0),
      verticalRotation,
    );

    group.quaternion.premultiply(horizontalQuaternion);
    group.quaternion.premultiply(verticalQuaternion);
  };

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

  useFrame(({ clock }, delta) => {
    const cube = cubeRef.current;
    if (!cube) return;

    const drag = dragRef.current;
    if (drag) {
      if (drag.started) {
        resetVelocity();
        drag.started = false;
      }

      if (drag.deltaX !== 0 || drag.deltaY !== 0) {
        const elapsedTime = Math.max(
          (drag.time - drag.lastAppliedTime) / 1000,
          0.001,
        );
        updateRotation(
          drag.deltaX * dragSensitivity,
          drag.deltaY * dragSensitivity,
        );
        updateDragVelocity(drag.deltaX, drag.deltaY, elapsedTime);
        drag.deltaX = 0;
        drag.deltaY = 0;
        drag.lastAppliedTime = drag.time;
      }
    } else if (dragGroupRef.current) {
      if (prefersReducedMotion) resetVelocity();
      else {
        updateRotation(
          dragVelocity.current.x * delta,
          dragVelocity.current.y * delta,
        );
        applyDamping(delta);
      }
    }

    if (!prefersReducedMotion) {
      for (const [axis, base, speed] of [
        ["x", baseRotations.X, cubeRotation.SPEED.X],
        ["y", baseRotations.Y, cubeRotation.SPEED.Y],
        ["z", baseRotations.Z, cubeRotation.SPEED.Z],
      ] as const) {
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
      <ambientLight
        intensity={CubeConstants.LIGHT.INTENSITY}
        color={lightColor}
      />
      <group ref={dragGroupRef}>
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
      </group>
    </>
  );
};

const HomeCube = () => {
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const dragRef = useRef<CubeDrag | null>(null);
  const [faceVisible, setFaceVisible] = useState<string | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0 || !event.isPrimary) return;

    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    dragRef.current = {
      pointerId: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      time: event.timeStamp,
      lastAppliedTime: event.timeStamp,
      deltaX: 0,
      deltaY: 0,
      started: true,
    };
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const drag = dragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;

    drag.deltaX += event.clientX - drag.x;
    drag.deltaY += event.clientY - drag.y;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.time = event.timeStamp;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragRef.current?.pointerId !== event.pointerId) return;
    dragRef.current = null;
  };

  const handleFaceChange = (face: string | null) => {
    if (face !== faceVisible && face !== null) setFaceVisible(face);
  };

  return (
    <div className="flex justify-center items-center flex-col flex-nowrap">
      <div
        className="relative size-[5.5em] touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          aria-hidden={isLoaded}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <RingLoader
            color="currentColor"
            cssOverride={{ color: "var(--color-secondary-foreground)" }}
          />
        </div>
        <Canvas className="touch-none overflow-visible transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
          <CubeThreeJS
            cubeRef={cubeRef}
            dragRef={dragRef}
            handleFaceChange={handleFaceChange}
            setIsLoaded={setIsLoaded}
          />
        </Canvas>
      </div>
      <div className="-mt-1 flex flex-col text-5xl text-primary-foreground [-webkit-text-stroke-color:var(--accent)] [-webkit-text-stroke-width:0.65px]">
        {faceVisible || <span style={{ opacity: 0.5 }}>Loading…</span>}
      </div>
    </div>
  );
};

export default HomeCube;
