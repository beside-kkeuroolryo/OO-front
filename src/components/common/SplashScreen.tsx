import { useEffect, useRef, useState } from 'react';

const imagePath = 'bg-[url("/splash.png")]';

export default function SplashScreen() {
  const splashRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean | null>(true);

  useEffect(() => {
    const handleTransitionEnd = () => {
      setIsVisible(null);
      if (splashRef.current) {
        splashRef.current.removeEventListener('transitionend', handleTransitionEnd);
      }
    };

    setIsVisible(false);
    if (splashRef.current) {
      splashRef.current.addEventListener('transitionend', handleTransitionEnd);
    }
  }, []);

  if (isVisible === null) {
    return null;
  }

  return (
    <div
      ref={splashRef}
      className={`ease-[cubic-bezier(0.65, 0.055, 0.675, 0.19)] absolute left-0 top-0 z-10 h-full w-full ${imagePath} bg-cover transition-opacity duration-[2000ms] ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    ></div>
  );
}
