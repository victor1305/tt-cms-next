import { useRef, useEffect } from 'react';

export const useOutsideClick = (callback) => {
  const ref = useRef < HTMLDivElement > null;

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);

  return ref;
};
