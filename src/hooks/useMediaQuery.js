import { useState, useEffect } from 'react';

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    
    // Set initial value
    setMatches(mediaQuery.matches);

    // Define the event listener function
    const handleChange = (event) => {
      setMatches(event.matches);
    };

    // Add the event listener
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup function to remove the event listener
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

// Pre-defined breakpoint hooks for common use cases
export const useIsMobile = () => useMediaQuery('(max-width: 575px)');
export const useIsTablet = () => useMediaQuery('(min-width: 576px) and (max-width: 767px)');
export const useIsDesktop = () => useMediaQuery('(min-width: 768px)');
export const useIsLargeDesktop = () => useMediaQuery('(min-width: 1200px)');

// Viewport size hooks
export const useViewportWidth = () => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return width;
};

export const useViewportHeight = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return height;
};

// Orientation hook
export const useOrientation = () => {
  const isPortrait = useMediaQuery('(orientation: portrait)');
  const isLandscape = useMediaQuery('(orientation: landscape)');

  return {
    isPortrait,
    isLandscape,
    orientation: isPortrait ? 'portrait' : 'landscape'
  };
};

// Device type detection hooks
export const useIsTouchDevice = () => {
  const [isTouch, setIsTouch] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    };

    setIsTouch(checkTouch());
  }, []);

  return isTouch;
};

// Reduced motion preference hook
export const usePrefersReducedMotion = () => {
  return useMediaQuery('(prefers-reduced-motion: reduce)');
};

// High contrast preference hook
export const usePrefersHighContrast = () => {
  return useMediaQuery('(prefers-contrast: high)');
};

// Dark mode preference hook
export const usePrefersDarkMode = () => {
  return useMediaQuery('(prefers-color-scheme: dark)');
};

export default useMediaQuery;