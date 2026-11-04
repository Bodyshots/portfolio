import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { Edges } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import * as THREE from "three";
import { CubeConstants } from "@/constants/cube";
import { texturesLoaded, useTextures } from "@/lib/three";
import "../globals.css";

const CubeThreeJS = ({ cubeRef, handleFaceChange, setIsLoaded }) => {
  const dragGroupRef = useRef();
  const dragRef = useRef(null);
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

  const updateDragVelocity = (deltaX, deltaY, elapsedTime) => {
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

  const applyDamping = (delta) => {
    const damping = Math.exp(cubeVelocity.DAMPING * delta);
    dragVelocity.current.x *= damping;
    dragVelocity.current.y *= damping;
  };

  const getIdleRotation = (elapsedTime, speed) =>
    Math.sin(elapsedTime * speed) * rotationAmplitude;

  const updateRotation = (horizontalRotation, verticalRotation) => {
    const group = dragGroupRef.current;

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

    if (!dragRef.current && dragGroupRef.current) {
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
      <ambientLight
        intensity={CubeConstants.LIGHT.INTENSITY}
        color={lightColor}
      />
      <group
        ref={dragGroupRef}
        onPointerDown={(event) => {
          if (event.button !== 0) return;
          event.stopPropagation();
          event.target.setPointerCapture(event.pointerId);
          resetVelocity();
          dragRef.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            time: event.nativeEvent.timeStamp,
          };
        }}
        // Handles cube dragging
        // Calcs change in pos (deltaX and deltaY) based on curr ptr pos and the last recorded pos
        // Also calcs elapsed time since last movement to det drag velocity
        // Cube's rotation updated based on this drag velocity, and drag ref is updated w/ the new ptr pos and time
        onPointerMove={(event) => {
          const drag = dragRef.current;
          if (
            !drag ||
            drag.pointerId !== event.pointerId ||
            !dragGroupRef.current
          )
            return;

          const deltaX = event.clientX - drag.x;
          const deltaY = event.clientY - drag.y;
          const currentTime = event.nativeEvent.timeStamp;
          const elapsedTime = Math.max((currentTime - drag.time) / 1000, 0.001);

          updateRotation(deltaX * dragSensitivity, deltaY * dragSensitivity);
          updateDragVelocity(deltaX, deltaY, elapsedTime);
          drag.x = event.clientX;
          drag.y = event.clientY;
          drag.time = currentTime;
        }}
        onPointerUp={(event) => {
          if (dragRef.current?.pointerId !== event.pointerId) return;
          event.target.releasePointerCapture(event.pointerId);
          dragRef.current = null;
        }}
        onPointerCancel={() => (dragRef.current = null)}
      >
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
        <Canvas className="touch-none transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
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
