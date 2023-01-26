// Libraries
import { useEffect, useState } from "react";

export function useMobile() {
    const [isMobile, setIsMobile] = useState<boolean>();

    function handleResize() {
        if (window.innerWidth >= 1050) {
            setIsMobile(false);
        }
        
        if (window.innerWidth < 1050 ) {
            setIsMobile(true);
        }
    }

    useEffect(() => {
        handleResize();
    }, [])

    useEffect(() => {
        window.addEventListener("resize", handleResize);

        return window.removeEventListener("resize", handleResize);
    }, [])

    return isMobile;
}