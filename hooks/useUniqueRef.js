import { useRef, useEffect } from 'react';

const useUniqueRef = (id, type) => {
  const ref = useRef(type);

  // Ensure the ref is initialized only once and remains unique for this component
  useEffect(() => {
    if (!ref.current) {
      ref.current = { id, element: null };
    }
  }, [id]);

  return ref;
};

export default useUniqueRef;
