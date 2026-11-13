import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTheme } from "@teispace/next-themes/client";
import {
  type Dispatch,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { CubeConstants } from "@/constants/cube";
import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";
import { getFacePath } from "@/lib/cube";
import { texturesLoaded, useTexturesWithBlackFallback } from "@/lib/three";
import { getElapsedSeconds } from "@/lib/time";

interface CubeDrag {
  pointerId: number;
  x: number;
  y: number;
  time: number;
  lastAppliedTime: number;
  deltaX: number;
  deltaY: number;
  started: boolean;
  ended: boolean;
}

interface CubeThreeJSProps {
  cubeRef: RefObject<THREE.Mesh | null>;
  dragRef: RefObject<CubeDrag | null>;
  handleFaceChange: (face: string | null) => void;
  resolvedTheme: string | undefined;
  setLoadedFacePath: Dispatch<SetStateAction<string | null>>;
}

// Object creation
const AXIS_X = new THREE.Vector3(1, 0, 0);
const AXIS_Y = new THREE.Vector3(0, 1, 0);

const horizontalQuaternion = new THREE.Quaternion();
const verticalQuaternion = new THREE.Quaternion();

const worldMatrix = new THREE.Matrix4();
const worldNormal = new THREE.Vector3();
const cameraDirection = new THREE.Vector3();

// Constants
const CUBE_DIMENSIONS = CubeConstants.DIMENSIONS;
const CUBE_EDGES = CubeConstants.EDGE;
const CUBE_LIGHTING = CubeConstants.LIGHT;
const CUBE_FACES = CubeConstants.FACES;
const CUBE_ROTATION = CubeConstants.ROTATION;
const CUBE_VELOCITY = CubeConstants.VELOCITY;
const CUBE_DRAG_SENSITIVITY = CubeConstants.VELOCITY.SENSITIVITY;
const CUBE_VELOCITY_THRESHOLD = CUBE_VELOCITY.THRESHOLD;

const BASE_ROTATIONS = CUBE_ROTATION.BASE;
const CUBE_ROTATION_SPEED = CUBE_ROTATION.SPEED;
const ROTATION_AMPLITUDE = THREE.MathUtils.degToRad(CUBE_ROTATION.AMPLITUDE);

const IDLE_ROTATION_AXES = [
  ["x", BASE_ROTATIONS.X, CUBE_ROTATION_SPEED.X],
  ["y", BASE_ROTATIONS.Y, CUBE_ROTATION_SPEED.Y],
  ["z", BASE_ROTATIONS.Z, CUBE_ROTATION_SPEED.Z],
] as const;

const CubeThreeJS = ({
  cubeRef,
  dragRef,
  handleFaceChange,
  resolvedTheme,
  setLoadedFacePath,
}: CubeThreeJSProps) => {
  const { camera } = useThree();
  const dragGroupRef = useRef<THREE.Group | null>(null);
  const faceCheckElapsed = useRef(0); // Face check clock
  const idleElapsed = useRef(0); // Idle animation clock
  const initialFaceCheckComplete = useRef(false);
  const faceCheckPending = useRef(false); // Marks dirty face
  const prefersReducedMotion = usePrefersReducedMotion();
  const facePath = getFacePath(resolvedTheme);
  const loadedTextures = useTexturesWithBlackFallback(
    CUBE_FACES.map((face) => `${facePath}${face.image}`),
  );
  const dragVelocity = useRef({
    x: CUBE_VELOCITY.INITIAL.X,
    y: CUBE_VELOCITY.INITIAL.Y,
  });
  const [themeColors, setThemeColors] = useState({ edge: "", light: "" });

  useEffect(() => {
    if (!resolvedTheme) return;

    const styles = getComputedStyle(document.documentElement);

    setThemeColors({
      edge: styles.getPropertyValue(CUBE_EDGES.COLOR).trim(),
      light:
        resolvedTheme === "dark"
          ? CUBE_LIGHTING.COLOR.DARK
          : styles.getPropertyValue(CUBE_LIGHTING.COLOR.LIGHT).trim(),
    });
  }, [resolvedTheme]);

  const resetVelocity = () => {
    dragVelocity.current.x = CUBE_VELOCITY.INITIAL.X;
    dragVelocity.current.y = CUBE_VELOCITY.INITIAL.Y;
  };

  const updateDragVelocity = (
    deltaX: number,
    deltaY: number,
    elapsedTime: number,
  ) => {
    dragVelocity.current.x = THREE.MathUtils.lerp(
      dragVelocity.current.x,
      (deltaX * CUBE_DRAG_SENSITIVITY) / elapsedTime,
      CubeConstants.VELOCITY.SMOOTHING,
    );
    dragVelocity.current.y = THREE.MathUtils.lerp(
      dragVelocity.current.y,
      (deltaY * CUBE_DRAG_SENSITIVITY) / elapsedTime,
      CubeConstants.VELOCITY.SMOOTHING,
    );
  };

  // Basically, weakens spin
  const applyDamping = (delta: number) => {
    const damping = Math.exp(CUBE_VELOCITY.DAMPING * delta);
    dragVelocity.current.x *= damping;
    dragVelocity.current.y *= damping;

    if (
      Math.abs(dragVelocity.current.x) < CUBE_VELOCITY_THRESHOLD &&
      Math.abs(dragVelocity.current.y) < CUBE_VELOCITY_THRESHOLD
    ) {
      dragVelocity.current.x = 0;
      dragVelocity.current.y = 0;
    }
  };

  const getIdleRotation = (elapsedTime: number, speed: number) =>
    Math.sin(elapsedTime * speed) * ROTATION_AMPLITUDE;

  const updateRotation = (
    horizontalRotation: number,
    verticalRotation: number,
  ) => {
    const group = dragGroupRef.current;
    if (!group) return;

    horizontalQuaternion.setFromAxisAngle(AXIS_Y, horizontalRotation);
    verticalQuaternion.setFromAxisAngle(AXIS_X, verticalRotation);

    group.quaternion
      .premultiply(horizontalQuaternion)
      .premultiply(verticalQuaternion);
  };

  const checkVisibleFace = () => {
    const cube = cubeRef.current;
    if (!cube) return;

    cube.updateMatrixWorld(true);
    worldMatrix.copy(cube.matrixWorld);

    camera.getWorldDirection(cameraDirection);

    let maxDot = -Infinity;
    let closestFace: string | null = null;

    for (const face of CUBE_FACES) {
      worldNormal.copy(face.normal).transformDirection(worldMatrix);

      const dotProduct = cameraDirection.dot(worldNormal);
      if (dotProduct > maxDot) {
        maxDot = dotProduct;
        closestFace = face.name;
      }
    }
    if (maxDot >= CubeConstants.FACE_THRESHOLD) handleFaceChange(closestFace);
  };

  const markDirtyFace = () => {
    faceCheckPending.current = true;
  };

  const markCleanFace = () => {
    faceCheckPending.current = false;
  };

  useFrame((_, delta) => {
    const cube = cubeRef.current;
    if (!cube) return;

    if (!initialFaceCheckComplete.current) {
      checkVisibleFace();
      initialFaceCheckComplete.current = true;
    }

    const drag = dragRef.current;
    if (drag) {
      // User begins interacting with the cube
      if (drag.started) {
        resetVelocity();
        drag.started = false;
      }

      // User actively moving the cube
      if (drag.deltaX !== 0 || drag.deltaY !== 0) {
        const elapsedTime = Math.max(
          getElapsedSeconds(drag.lastAppliedTime, drag.time),
          0.001,
        );
        updateRotation(
          drag.deltaX * CUBE_DRAG_SENSITIVITY,
          drag.deltaY * CUBE_DRAG_SENSITIVITY,
        );
        markDirtyFace();

        updateDragVelocity(drag.deltaX, drag.deltaY, elapsedTime);
        drag.deltaX = 0;
        drag.deltaY = 0;
        drag.lastAppliedTime = drag.time;
      }
    } else if (dragGroupRef.current) {
      // Cube intertia
      if (prefersReducedMotion) resetVelocity();
      else if (dragVelocity.current.x !== 0 || dragVelocity.current.y !== 0) {
        updateRotation(
          dragVelocity.current.x * delta,
          dragVelocity.current.y * delta,
        );
        markDirtyFace();
        applyDamping(delta);
      }
    }

    const isInteracting =
      drag !== null ||
      dragVelocity.current.x !== 0 ||
      dragVelocity.current.y !== 0;

    // Idle animation
    if (!prefersReducedMotion && !isInteracting) {
      idleElapsed.current += delta;

      for (const [axis, base, speed] of IDLE_ROTATION_AXES) {
        cube.rotation[axis] =
          base + getIdleRotation(idleElapsed.current, speed);
      }
      markDirtyFace();
    }

    if (drag?.ended && drag.deltaX === 0 && drag.deltaY === 0) {
      dragRef.current = null;
    }

    if (faceCheckPending.current) {
      faceCheckElapsed.current += delta;

      if (faceCheckElapsed.current >= 0.1) {
        checkVisibleFace();
        markCleanFace();
        faceCheckElapsed.current = 0;
      }
    }
  });

  useEffect(() => {
    if (texturesLoaded(loadedTextures)) setLoadedFacePath(facePath);
  }, [facePath, loadedTextures, setLoadedFacePath]);

  return (
    <>
      <ambientLight
        intensity={CUBE_LIGHTING.INTENSITY}
        color={themeColors.light}
      />
      <group ref={dragGroupRef}>
        <mesh
          ref={cubeRef}
          rotation={[BASE_ROTATIONS.X, BASE_ROTATIONS.Y, BASE_ROTATIONS.Z]}
        >
          <boxGeometry
            args={[
              CUBE_DIMENSIONS.WIDTH,
              CUBE_DIMENSIONS.HEIGHT,
              CUBE_DIMENSIONS.DEPTH,
            ]}
          />
          {CUBE_FACES.map((face, index) => (
            <meshStandardMaterial
              key={face.name}
              map={loadedTextures[index]}
              attach={`material-${face.materialIndex}`}
            />
          ))}
          <Edges color={themeColors.edge} lineWidth={CUBE_EDGES.LINE_WIDTH} />
        </mesh>
      </group>
    </>
  );
};

const HomeCube = () => {
  const { resolvedTheme } = useTheme();
  const cubeRef = useRef<THREE.Mesh | null>(null);
  const dragRef = useRef<CubeDrag | null>(null);
  const [faceVisible, setFaceVisible] = useState<string | null>(null);
  const facePath = getFacePath(resolvedTheme);
  const [loadedFacePath, setLoadedFacePath] = useState<string | null>(null);
  const isLoaded = loadedFacePath === facePath;

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
      ended: false,
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
    const drag = dragRef.current;
    if (drag?.pointerId !== event.pointerId) return;
    drag.ended = true;
  };

  const handleFaceChange = (face: string | null) => {
    if (face !== faceVisible && face !== null) setFaceVisible(face);
  };

  return (
    <div className="flex justify-center items-center flex-col flex-nowrap">
      <div
        className="relative size-[5.5em] touch-none overflow-clip cursor-grab active:cursor-grabbing"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        <div
          aria-hidden={isLoaded}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center ${
            isLoaded
              ? "opacity-0 transition-opacity duration-300"
              : "opacity-100"
          }`}
        >
          <LoadingSpinner />
        </div>
        <Canvas className="touch-none overflow-clip transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
          <CubeThreeJS
            cubeRef={cubeRef}
            dragRef={dragRef}
            handleFaceChange={handleFaceChange}
            resolvedTheme={resolvedTheme}
            setLoadedFacePath={setLoadedFacePath}
          />
        </Canvas>
      </div>
      <div className="-mt-1 flex flex-col text-5xl text-primary-foreground text_highlight">
        {faceVisible || <span style={{ opacity: 0.5 }}>Loading…</span>}
      </div>
    </div>
  );
};

export default HomeCube;
