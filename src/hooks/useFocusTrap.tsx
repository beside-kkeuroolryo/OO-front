import { useEffect } from 'react';

export function useFocusTrap(isModalOpen: boolean, ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!isModalOpen) return;

    const handleTabKey = (event: KeyboardEvent) => {
      if (!ref.current || event.key !== 'Tab') return;

      const { shiftKey } = event;
      const focusableElements = [
        ...ref.current.querySelectorAll<HTMLElement>(
          'a[href], button, input, textarea, select, details, [tabindex]:not([tabindex="-1"]',
        ),
      ].filter((elem) => !elem.hasAttribute('disabled'));

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (!shiftKey && document.activeElement === lastElement) {
        event.preventDefault();
        return firstElement.focus();
      }

      if (shiftKey && document.activeElement === firstElement) {
        event.preventDefault();
        return lastElement.focus();
      }
    };

    document.addEventListener('keydown', handleTabKey);
    return () => document.removeEventListener('keydown', handleTabKey);
  }, [isModalOpen, ref]);
}
