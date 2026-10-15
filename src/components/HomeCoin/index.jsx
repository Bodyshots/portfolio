// Based on code from https://github.com/rene78/Rotating-Coin/blob/master/js/main.js

import { OrbitControls } from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import "./homecoin.css";
import "../globals.css";
import { CoinConstants } from "../../constants/coin";
import sidesimg from "../../images/circumference.avif";
import profileimg from "../../images/headshot.avif";

const CoinThreeJS = ({ handleLoadingDone }) => {
  const coinRef = useRef();
  const face = useLoader(TextureLoader, profileimg);
  const sides = useLoader(TextureLoader, sidesimg);
  sides.wrapS = THREE.RepeatWrapping;
  sides.repeat.set(30, 0);

  useFrame((_, delta) => {
    coinRef.current.rotation.y += delta * 0.125;
    coinRef.current.rotation.z += delta * 0.125;
  });

  useEffect(() => {
    const checkTexturesLoaded = () => {
      if (face && sides) {
        handleLoadingDone();
      }
    };

    checkTexturesLoaded();
  }, [sides, face, handleLoadingDone]);

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={8.25} color={"#efe9cf"} />
      <pointLight color={"white"} intensity={1} position={[-1, -1, -1]} />
      <pointLight color={"white"} intensity={1} position={[1, 2, 3]} />
      <pointLight color={"#61001d"} intensity={1} position={[0, 3, 2]} />
      <pointLight color={"#8d494d"} intensity={1} position={[-1, -1, -1]} />
      <directionalLight color={"#61001d"} intensity={1} position={[0, 0, 2]} />
      <mesh
        ref={coinRef}
        rotation={[
          THREE.MathUtils.degToRad(90),
          THREE.MathUtils.degToRad(90),
          0,
        ]}
      >
        <cylinderGeometry args={[3, 3, 0.25, 100]} />
        <meshStandardMaterial
          map={face}
          attach="material-1"
          roughness={CoinConstants.DEFAULT_ROUGHNESS}
          metalness={CoinConstants.DEFAULT_METALNESS}
        />
        <meshStandardMaterial
          map={face}
          attach="material-2"
          roughness={CoinConstants.DEFAULT_ROUGHNESS}
          metalness={CoinConstants.DEFAULT_METALNESS}
        />
        <meshStandardMaterial
          map={sides}
          attach="material-0"
          roughness={CoinConstants.DEFAULT_ROUGHNESS}
          metalness={CoinConstants.DEFAULT_METALNESS}
        />
      </mesh>
    </>
  );
};

const HomeCoin = () => {
  const [_isLoaded, setIsLoaded] = useState(false);

  const handleLoadingDone = () => {
    setIsLoaded(true);
  };

  return (
    <div data-aos="fade-left" className="coin_container">
      <div id="canvas_coincontainer">
        <Canvas>
          <CoinThreeJS handleLoadingDone={handleLoadingDone} />
        </Canvas>
      </div>
    </div>
  );
};

export default HomeCoin;
