import { OrbitControls, Edges } from "@react-three/drei";
import { Canvas, useFrame, useLoader,  } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useRef } from "react";

import pythonimg from "../../images/faces/python_face.png"
import htmlimg from "../../images/faces/HTML_CSS_JS_face.png"
import cimg from "../../images/faces/C_face.png"
import javaimg from "../../images/faces/java_face.png"
import reactimg from "../../images/faces/react_face.png"
import sqlliteimg from "../../images/faces/SQLite_face.png"

const CubeThreeJS = () => {

    const cubeRef = useRef();

    useFrame((state, delta) => {
        cubeRef.current.rotation.x += (delta * 0.1);
        cubeRef.current.rotation.y += (delta * 0.1);
        cubeRef.current.rotation.z += (delta * 0.1);
    });

    const texture_1 = useLoader(TextureLoader, pythonimg);
    const texture_2 = useLoader(TextureLoader, htmlimg);
    const texture_3 = useLoader(TextureLoader, cimg);
    const texture_4 = useLoader(TextureLoader, javaimg);
    const texture_5 = useLoader(TextureLoader, reactimg);
    const texture_6 = useLoader(TextureLoader, sqlliteimg);

    return (
        <>
        {/* Settings of cube */}
        <OrbitControls enableZoom={false} enablePan={false}/>
        <ambientLight intensity={3.19} color={'#efe9cf'}/>
            {/* Cube Object */}
            <mesh ref={cubeRef}>
                <boxGeometry args={[2.1, 2.1, 2.1]}/>
                <meshStandardMaterial map={texture_1} attach="material-0"/>
                <meshStandardMaterial map={texture_2} attach="material-1"/>
                <meshStandardMaterial map={texture_3} attach="material-2"/>
                <meshStandardMaterial map={texture_4} attach="material-3"/>
                <meshStandardMaterial map={texture_5} attach="material-4"/>
                <meshStandardMaterial map={texture_6} attach="material-5"/>
                <Edges color="#e5ddac" lineWidth={0.5} />
            </mesh>
        </>
    )
}

const HomeCube = () => {
    return (
        <div style={{ width: "9.5em", height: "9.5em"}}>
        <Canvas>
            <CubeThreeJS/>
        </Canvas>
        </div>
    )
}

export default HomeCube;