// Based on code from https://github.com/rene78/Rotating-Coin/blob/master/js/main.js

import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { CoinConstants } from "@/constants/coin";
import LoadingSpinner from "@/features/global/Skeletons/LoadingSpinner";
import { texturesLoaded, useTextures } from "@/lib/three";

interface CoinThreeJSProps {
  setIsLoaded: (value: boolean) => void;
}

const COIN_ROTATION = CoinConstants.ROTATION;
const COIN_TEXTURES = CoinConstants.TEXTURES;
const BASE_ROTATIONS = COIN_ROTATION.BASE;
const COIN_SPEED = COIN_ROTATION.SPEED;

const BASE_ROTATIONS_RADIANS = {
  X: THREE.MathUtils.degToRad(BASE_ROTATIONS.X),
  Y: THREE.MathUtils.degToRad(BASE_ROTATIONS.Y),
  Z: THREE.MathUtils.degToRad(BASE_ROTATIONS.Z),
};

const WOBBLE_RADIANS = {
  X: THREE.MathUtils.degToRad(COIN_ROTATION.WOBBLE.X),
  Z: THREE.MathUtils.degToRad(COIN_ROTATION.WOBBLE.Z),
};

const SPIN_AMPLITUDE_RADIANS = THREE.MathUtils.degToRad(
  COIN_ROTATION.AMPLITUDE,
);

// Polar Angle
const polarAngles = CoinConstants.POLAR_ANGLE;

const CoinThreeJS = ({ setIsLoaded }: CoinThreeJSProps) => {
  const spinRef = useRef<THREE.Group | null>(null);
  const coinRef = useRef<THREE.Mesh | null>(null);
  const isInteracting = useRef(false);
  const idlePhase = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Textures
  const loadedTextures = useTextures(
    COIN_TEXTURES.map((texture) => texture.image),
  );

  useEffect(() => {
    loadedTextures.forEach((loadedTexture, index) => {
      const texture = COIN_TEXTURES[index];

      if (
        texture.wrapS !== undefined &&
        loadedTexture.wrapS !== texture.wrapS
      ) {
        loadedTexture.wrapS = texture.wrapS;
        loadedTexture.needsUpdate = true;
      }

      if (texture.repeat) loadedTexture.repeat.set(...texture.repeat);
      if (texture.offset) loadedTexture.offset.set(...texture.offset);
    });

    setIsLoaded(texturesLoaded(loadedTextures));
  }, [loadedTextures, setIsLoaded]);

  useFrame((_, delta) => {
    const spin = spinRef.current;
    const coin = coinRef.current;
    if (!spin || !coin) return;

    if (!prefersReducedMotion && !isInteracting.current) {
      idlePhase.current += delta;
    }

    spin.rotation.y = prefersReducedMotion
      ? 0
      : Math.sin(idlePhase.current * COIN_SPEED.Y) * SPIN_AMPLITUDE_RADIANS;

    if (!prefersReducedMotion) {
      coin.rotation.x =
        BASE_ROTATIONS_RADIANS.X +
        Math.sin(idlePhase.current * COIN_SPEED.X) * WOBBLE_RADIANS.X;
      coin.rotation.y = BASE_ROTATIONS_RADIANS.Y;
      coin.rotation.z =
        BASE_ROTATIONS_RADIANS.Z +
        Math.sin(idlePhase.current * COIN_SPEED.Z) * WOBBLE_RADIANS.Z;
    }
  });

  return (
    <>
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        minPolarAngle={polarAngles.MIN}
        maxPolarAngle={polarAngles.MAX}
        onStart={() => (isInteracting.current = true)}
        onEnd={() => (isInteracting.current = false)}
      />
      <group ref={spinRef}>
        <mesh
          ref={coinRef}
          rotation={[
            BASE_ROTATIONS_RADIANS.X,
            BASE_ROTATIONS_RADIANS.Y,
            BASE_ROTATIONS_RADIANS.Z,
          ]}
        >
          <cylinderGeometry
            args={[
              CoinConstants.GEOMETRY.RADIUS_TOP,
              CoinConstants.GEOMETRY.RADIUS_BOTTOM,
              CoinConstants.GEOMETRY.HEIGHT,
              CoinConstants.GEOMETRY.RADIAL_SEGMENTS,
            ]}
          />
          {COIN_TEXTURES.map((texture, index) => (
            <meshBasicMaterial
              key={texture.name}
              map={loadedTextures[index]}
              attach={`material-${texture.materialIndex}`}
              toneMapped={false}
            />
          ))}
        </mesh>
      </group>
    </>
  );
};

const HomeCoin = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <div
      data-aos="fade-down"
      className="flex flex-col flex-nowrap items-center justify-center w-auto mx-auto my-2"
    >
      <div className="relative flex h-100 w-100 items-center justify-center max-lg:h-82 max-lg:w-82">
        <div
          aria-hidden={isLoaded}
          className={`pointer-events-none absolute inset-0 z-10 flex items-center justify-center transition-opacity duration-300 ${
            isLoaded ? "opacity-0" : "opacity-100"
          }`}
        >
          <LoadingSpinner />
        </div>
        <Canvas className="h-full w-full overflow-visible transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
          <CoinThreeJS setIsLoaded={setIsLoaded} />
        </Canvas>
      </div>
    </div>
  );
};

export default HomeCoin;
