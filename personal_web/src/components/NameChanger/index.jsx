import './namechanger.css'
import '../globals.css'
import { useEffect, useState, useRef } from 'react';

function NameChanger() {
    
    const [currIndex, setCurrIndex] = useState(0);
    const roleNames = ["a developer", "an engineer", "an architect", "a designer", 
                       "an innovator", "a planner", "an inventor", "a researcher"];

    useEffect(() => {
        if (currIndex == roleNames.length - 1) {
            setCurrIndex(0);
        }
        const interval = setInterval(() => {
            const newRole = currIndex + 1;
            setCurrIndex(newRole);
        }, 1000)

        return () => clearInterval(interval);
    }, [currIndex])

    return (
        <div id='changer_container'>
            <span className="subtitle text_highlight">yo, i'm</span>
            <span className="text_highlight" id="name">lanz,</span>
            <span className="subtitle text_highlight">{roleNames[currIndex]}</span>
        </div>
    )
}

export default NameChanger;