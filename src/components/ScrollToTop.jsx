import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Instantly scroll to the top left of the window whenever the route (pathname) changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant' 
    });
  }, [pathname]);

  // This component doesn't render anything visually
  return null;
};

export default ScrollToTop;