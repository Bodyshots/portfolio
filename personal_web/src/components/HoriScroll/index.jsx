import React from 'react';
import '../globals.css'
import './horiscroll.css'

/* Most Card CSS from: https://www.youtube.com/watch?v=FLt2TveqHQM */

function HoriScroll(right, text, section_nme) {

    const ITEM_NUM = 32;

    const scrollItem = (right, text, section_nme, i) => {
        const scroll_type = right ? "right" : "left"

        return (((i % 2) == 0) ? 
                <div className={"text-divider-scroll-item-" + scroll_type + " " + section_nme + " text_shadow item" + i}>{text}</div>
                :
                <div className={"text-divider-scroll-item-" + scroll_type + " " + section_nme + " text_shadow item" + i}>-</div>)
    }

    return (
        <>{<div className="text-divider-sec">
                <div className="text-divider-scroll">
                    {Array.from(Array(ITEM_NUM), (_, i) => scrollItem(right, text, section_nme, i + 1))}
                </div>
            </div>}
        </>
      );
}

export default HoriScroll;