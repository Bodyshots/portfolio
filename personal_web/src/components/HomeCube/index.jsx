// Majority of code from https://dev.to/maxinejs/how-to-create-a-3d-cube-in-reactjs-1ej7

import * as React from 'react';
import './homecube.css'
import { useEffect } from 'react';

// Cube code provided by
// https://library.superhi.com/posts/how-to-make-an-interactive-rotating-3d-cube-with-css-and-javascript

function HomeCube() {

  const handleMouseMove = (e) => {
    // Get (x, y) dimensions of the page
    const x = e.pageX
    const y = e.pageY
  
    // Get middle of the page (x, y)
    const midX = x - window.innerWidth / 2
    const midY = y - window.innerHeight / 2

    // Find the cube
    const box = document.getElementById("cube")

    // Transform the cube's rotation, based on the cursor's position
    box.style.transform = "rotateX(" + (-midY * 0.35) + "deg) rotateY(" + (midX * 0.35) + "deg)"
    // Smooth the cube's rotation
    box.style.transition = "transform 0.4s ease"
  }

  // For rerenders
  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove, false)

    return () => window.removeEventListener("mousemove", handleMouseMove, false);
  }, [])

  return (
      <div id="cube" onMouseMove={handleMouseMove}>
        <div className="face face-front"></div>
        <div className="face face-right"></div>
        <div className="face face-back"></div>
        <div className="face face-left"></div>
        <div className="face face-top"></div>
        <div className="face face-bottom"></div>
      </div>
  )
}

export default HomeCube