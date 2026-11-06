// Based on code from https://github.com/rene78/Rotating-Coin/blob/master/js/main.js

import { usePrefersReducedMotion } from "@anatoliygatt/use-prefers-reduced-motion";
import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { RingLoader } from "react-spinners";
import * as THREE from "three";
import { CoinConstants } from "@/constants/coin";
import { texturesLoaded, useTextures } from "@/lib/three";

const CoinThreeJS = ({ setIsLoaded }) => {
  const spinRef = useRef();
  const coinRef = useRef();
  const isInteracting = useRef(false);
  const idlePhase = useRef(0);
  const prefersReducedMotion = usePrefersReducedMotion();

  // Polar Angle
  const polarAngles = CoinConstants.POLAR_ANGLE;

  // Textures
  const textures = CoinConstants.TEXTURES;
  const loadedTextures = useTextures(textures.map((texture) => texture.image));
  loadedTextures.forEach((loadedTexture, index) => {
    const texture = textures[index];
    if (texture.wrapS !== undefined) loadedTexture.wrapS = texture.wrapS;
    if (texture.repeat) loadedTexture.repeat.set(...texture.repeat);
    if (texture.offset) loadedTexture.offset.set(...texture.offset);
  });

  // Rotation
  const coinRotation = CoinConstants.ROTATION;
  const baseRotations = coinRotation.BASE;
  const baseRotationsRadians = {
    X: THREE.MathUtils.degToRad(baseRotations.X),
    Y: THREE.MathUtils.degToRad(baseRotations.Y),
    Z: THREE.MathUtils.degToRad(baseRotations.Z),
  };
  const wobble = coinRotation.WOBBLE;

  useFrame((_, delta) => {
    const spin = spinRef.current;
    const coin = coinRef.current;
    if (!spin || !coin) return;

    if (!prefersReducedMotion && !isInteracting.current) {
      idlePhase.current += delta;
    }

    spin.rotation.y = prefersReducedMotion
      ? 0
      : Math.sin(idlePhase.current * coinRotation.SPEED.Y) *
        THREE.MathUtils.degToRad(coinRotation.AMPLITUDE);

    if (!prefersReducedMotion) {
      coin.rotation.x =
        baseRotationsRadians.X +
        Math.sin(idlePhase.current * coinRotation.SPEED.X) *
          THREE.MathUtils.degToRad(wobble.X);
      coin.rotation.y = baseRotationsRadians.Y;
      coin.rotation.z =
        baseRotationsRadians.Z +
        Math.sin(idlePhase.current * coinRotation.SPEED.Z) *
          THREE.MathUtils.degToRad(wobble.Z);
    }
  });

  useEffect(() => {
    setIsLoaded(texturesLoaded(loadedTextures));
  }, [loadedTextures, setIsLoaded]);

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
            baseRotationsRadians.X,
            baseRotationsRadians.Y,
            baseRotationsRadians.Z,
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
          {textures.map((texture, index) => (
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
      data-aos="fade-left"
      className="flex h-full flex-col flex-nowrap items-center justify-center mx-25"
    >
      <div className="relative h-100 w-100 max-[991px]:h-82 max-[991px]:w-82">
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
        <Canvas className="transition-transform duration-150 ease-out hover:-translate-y-0.5 hover:cursor-grab active:cursor-grabbing motion-reduce:transform-none motion-reduce:transition-none">
          <CoinThreeJS setIsLoaded={setIsLoaded} />
        </Canvas>
      </div>
    </div>
  );
};

export default HomeCoin;
