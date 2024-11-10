import { OrbitControls, Edges } from "@react-three/drei";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
import "./homecube.css"
import "../globals.css"
import { Spinner } from "react-bootstrap";

import pythonimg from "../../images/faces/python_face.png"
import htmlimg from "../../images/faces/javascript.png"
import cimg from "../../images/faces/C_face.png"
import javaimg from "../../images/faces/java_face.png"
import reactimg from "../../images/faces/react_face.png"
import nextjsimg from '../../images/faces/nextjs_face.png'

const countProjects = (projectList, keywords) => {
    const counts = {};
    
    // Initialize counts for each keyword
    keywords.forEach(keyword => {
      counts[keyword] = 0;
    });
  
    // Iterate through each project
    projectList.forEach(project => {
      keywords.forEach(keyword => {
        // Check if the project includes the keyword in tools
        if (project.tools.includes(keyword)) {
          counts[keyword] += 1; // Increment the count for that keyword
        }
      });
    });
  
    return counts;
  };

const CubeThreeJS = ({ cubeRef, handleFaceChange, handleLoadingDone }) => {
    const { camera } = useThree();
    const threshold = 0.70; // Threshold for detection

    // Find the face whose normal vector is closest to the current direction
    let maxDot = -Infinity;
    let closestFace = null;

    // Define the faces of the cube and their corresponding normal vectors
    const faces = {
        "Next.js": new THREE.Vector3(0, 0, 1),  // Z+ direction (front)
        "React": new THREE.Vector3(0, 0, -1),  // Z- direction (back)
        "Python": new THREE.Vector3(-1, 0, 0),  // X- direction (left)
        "JavaScript": new THREE.Vector3(1, 0, 0),  // X+ direction (right)
        "Java": new THREE.Vector3(0, 1, 0),    // Y+ direction (top)
        "C/C++": new THREE.Vector3(0, -1, 0) // Y- direction (bottom)
    };

    // Function to check which face is closest to the camera
    const checkVisibleFace = () => {
        const cube = cubeRef.current;
        if (!cube) return;

        // Get the cube's world matrix
        const matrix = new THREE.Matrix4();
        cube.updateMatrixWorld();
        matrix.copy(cube.matrixWorld);

        // Get the cube's current world direction (normal vector pointing out from the front face)
        const cameraDirection = new THREE.Vector3();
        camera.getWorldDirection(cameraDirection);

        for (const [faceName, faceNormal] of Object.entries(faces)) {
            const worldNormal = faceNormal.clone().applyMatrix4(matrix).normalize(); // Transform face normal to world space
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
        const checkTexturesLoaded = () => {
            if (texture_1 && texture_2 && texture_3 &&
                texture_4 && texture_5 && texture_6) {
                    handleLoadingDone(); // All textures loaded, set isLoaded to true
                }
        };

        checkTexturesLoaded();
    }, [texture_1, texture_2, texture_3, texture_4, texture_5, texture_6])

    return (
        <>
        {/* Settings of cube */}
        <OrbitControls enableZoom={false} enablePan={false}/>
        <ambientLight intensity={3.19} color={'#efe9cf'}/>
            {/* Cube Object */}
            <mesh ref={cubeRef}>
                <boxGeometry args={[3, 3, 3]}/>
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

const HomeCube = ({project_lst}) => {
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
    const projectCounts = countProjects(project_lst, keywords);

    const projects_used_in = ( tool ) => {
        const count = projectCounts[tool]
        return ((count > 1) ?
        <div id="face_subtitle" data-aos="fade-up">
            Used in {count} projects
        </div> :
        <div id="face_subtitle" data-aos="fade-up">
            Used in {count} project
        </div>);
    }

    return (        
        <div className="cube_container">
            {!isLoaded && <Spinner id="cube_spinner"/>}
            <div style={{ width: "5.5em", height: "5.5em"}}>
                <Canvas>
                    <CubeThreeJS 
                    cubeRef={cubeRef}
                    handleFaceChange={handleFaceChange}
                    handleLoadingDone={handleLoadingDone}/>
                </Canvas>
            </div>
            <div className="face_detect_container text_highlight">
                <span data-aos="fade-up">{faceVisible}</span>
                {projects_used_in(faceVisible)}
            </div>
        </div> 
    )
}

export default HomeCube;