import { OrbitControls, Edges } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useEffect, useRef, useState, useMemo } from "react";
import * as THREE from 'three';
import "./homecube.css"
import "../globals.css"
import { Spinner } from "react-bootstrap";

import pythonimg from "../../images/faces/python_face.png"
import htmlimg from "../../images/faces/javascript_face.png"
import cimg from "../../images/faces/C_face.png"
import javaimg from "../../images/faces/java_face.png"
import reactimg from "../../images/faces/react_face.png"
import nextjsimg from '../../images/faces/nextjs_face.png'

const countProjects = (projectList, keywords) => {
    const counts = {};
    keywords.forEach(keyword => { counts[keyword] = 0; });
    projectList.forEach(project => {
        keywords.forEach(keyword => {
            if (project.tools.includes(keyword)) {
                counts[keyword] += 1;
            }
        });
    });
    return counts;
};

const CubeThreeJS = ({ cubeRef, handleFaceChange, handleLoadingDone }) => {
    const { camera } = useThree();
    const threshold = 0.70;
    let maxDot = -Infinity;
    let closestFace = null;

    const faces = {
        "Next.js": new THREE.Vector3(0, 0, 1),
        "React": new THREE.Vector3(0, 0, -1),
        "Python": new THREE.Vector3(-1, 0, 0),
        "JavaScript": new THREE.Vector3(1, 0, 0),
        "Java": new THREE.Vector3(0, 1, 0),
        "C/C++": new THREE.Vector3(0, -1, 0)
    };

    const checkVisibleFace = () => {
        const cube = cubeRef.current;
        if (!cube) return;
        const matrix = new THREE.Matrix4();
        cube.updateMatrixWorld();
        matrix.copy(cube.matrixWorld);
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);
        for (const [faceName, faceNormal] of Object.entries(faces)) {
            const worldNormal = faceNormal.clone().applyMatrix4(matrix).normalize();
            const dotProduct = cameraDirection.dot(worldNormal);
            if (dotProduct > maxDot || dotProduct >= threshold) {
                maxDot = dotProduct;
                closestFace = faceName;
            }
        }
        handleFaceChange(closestFace)
    };

    useFrame((state, delta) => {
        cubeRef.current.rotation.x += (delta * 0.125);
        cubeRef.current.rotation.y += (delta * 0.125);
        cubeRef.current.rotation.z += (delta * 0.125);
        checkVisibleFace();
    });

    const texture_1 = useLoader(TextureLoader, pythonimg);
    const texture_2 = useLoader(TextureLoader, htmlimg);
    const texture_3 = useLoader(TextureLoader, cimg);
    const texture_4 = useLoader(TextureLoader, javaimg);
    const texture_5 = useLoader(TextureLoader, reactimg);
    const texture_6 = useLoader(TextureLoader, nextjsimg);

    useEffect(() => {
        if (texture_1 && texture_2 && texture_3 && texture_4 && texture_5 && texture_6) {
            handleLoadingDone();
        }
    }, [texture_1, texture_2, texture_3, texture_4, texture_5, texture_6]);

    return (
        <>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={3.19} color={'#efe9cf'} />
            <mesh ref={cubeRef}>
                <boxGeometry args={[3, 3, 3]} />
                <meshStandardMaterial map={texture_1} attach="material-0" />
                <meshStandardMaterial map={texture_2} attach="material-1" />
                <meshStandardMaterial map={texture_3} attach="material-2" />
                <meshStandardMaterial map={texture_4} attach="material-3" />
                <meshStandardMaterial map={texture_5} attach="material-4" />
                <meshStandardMaterial map={texture_6} attach="material-5" />
                <Edges color="#e5ddac" lineWidth={0.5} />
            </mesh>
        </>
    )
}

const HomeCube = ({ project_lst }) => {
    const cubeRef = useRef();
    const [faceVisible, setFaceVisible] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const handleFaceChange = (face) => {
        if (face !== faceVisible && face !== null) {
            setFaceVisible(face);
        }
    };
    const handleLoadingDone = () => {
        setIsLoaded(true);
    }

    const keywords = ["Next.js", "JavaScript", "React", "C/C++", "Java", "Python"];
    const projectCounts = useMemo(() => countProjects(project_lst, keywords), [project_lst]);

    // Remove data-aos from LCP elements, always render the subtitle for layout stability
    const projects_used_in = (tool) => {
        const count = projectCounts[tool] || 0;
        return (
            <div id="face_subtitle">
                Used in {count} project{count === 1 ? "" : "s"}
            </div>
        );
    }

    return (
        <div className="cube_container">
            {!isLoaded && <Spinner id="cube_spinner" />}
            <div style={{ width: "5.5em", height: "5.5em" }}>
                <Canvas>
                    <CubeThreeJS
                        cubeRef={cubeRef}
                        handleFaceChange={handleFaceChange}
                        handleLoadingDone={handleLoadingDone} />
                </Canvas>
            </div>
            <div className="face_detect_container text_highlight">
                <span>{faceVisible || <span style={{ opacity: 0.5 }}>Loading…</span>}</span>
                {projects_used_in(faceVisible)}
            </div>
        </div>
    )
}

export default HomeCube;