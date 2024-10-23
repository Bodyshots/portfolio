import "./scrollindicator.css";
import { useState, useEffect } from "react";

// Most code taken from https://www.youtube.com/watch?v=X1PI52QLanE
const ScrollIndicator = () => {
    const [scrollTop, setScrollTop] = useState(0);
    const [indicator, setIndicator] = useState(false);

    const handleScroll = () => {
        const winScroll = document.documentElement.scrollTop;
        const height = (document.documentElement.scrollHeight -
                        document.documentElement.clientHeight);
        
        const scrolled = (winScroll / height) * 100;

        setScrollTop(scrolled)

        if (window.scrollY >= 840) {
            setIndicator(true);
        }
        else {
            setIndicator(false);
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, [])

    return (
        <div className={indicator ? "progress_container active" : "progress_container"}>
            <div
                className={indicator ? "progress_style active" : "progress_style"}
                style={{ width: `${scrollTop}%`}}>
            </div>
        </div>
    )

}

export default ScrollIndicator;