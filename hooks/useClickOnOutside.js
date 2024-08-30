import { useEffect } from 'react';

function useClickOutside(ref, handler) {
  useEffect(() => {
    // Define the event listener for detecting clicks outside the ref element
    const handleClickOutside = (event) => {
      // Check if the click is outside the ref element
      if (ref.current && !ref.current.contains(event.target)) {
        handler(event);
      }
    };

    // Attach the event listener to the document
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, handler]); // Re-run the effect if ref or handler changes
}

export default useClickOutside;
