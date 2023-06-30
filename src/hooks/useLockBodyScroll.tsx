import { useEffect } from 'react';

export default function useLockBodyScroll(isOpen: boolean) {
  useEffect(() => {
    if (isOpen) {
      const scrollPosition = window.pageYOffset;
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPosition}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      return () => {
        document.body.style.removeProperty('overflow');
        document.body.style.removeProperty('position');
        document.body.style.removeProperty('top');
        document.body.style.removeProperty('left');
        document.body.style.removeProperty('right');
        window.scrollTo(0, scrollPosition);
      };
    }
  }, [isOpen]);
}
