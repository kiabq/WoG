// Libraries
import React, { useEffect, useState } from "react";

export function useMobile() {
    const [isMobile, setIsMobile] = useState(false);

    function handleResize() {
        if (window.innerWidth >= 1100) {
            setIsMobile(false);
        }
        
        if (window.innerWidth < 1100 ) {
            setIsMobile(true);
        }
    }

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return window.removeEventListener('reize', handleResize);
    }, [window.innerWidth])

    return isMobile;
}