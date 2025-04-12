import { useEffect, useState } from "react";

export function useMediaQuery(query: string): boolean {
   /*
   getMatches : This function checks whether the current browser window matches a media query string (e.g., "max-width: 768px"), 
   but safely—so it doesn't break in environments where window isn't defined (like during server-side rendering or testing).
   */
    const getMatches = (query: string): boolean => {
        if (typeof window !== "undefined") {
            return window.matchMedia(query).matches;
        }
        return false;
    };

    const [matches, setMatches] = useState<boolean>(getMatches(query));

    useEffect(() => {
        const matchMedia = window.matchMedia(query);

        // Set the initial value
        const handleChange = () => setMatches(matchMedia.matches);

        handleChange(); // Sync with current state
        matchMedia.addEventListener("change", handleChange);

        return () => {
            matchMedia.removeEventListener("change", handleChange);
        };
    }, [query]);

    return matches;
}
