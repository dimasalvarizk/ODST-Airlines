import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade';
  delay?: number; // Delay in milliseconds
  duration?: number; // Duration in milliseconds
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 750,
  className = '',
  threshold = 0.12,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(element);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once]);

  const getInitialStyle = (): React.CSSProperties => {
    const baseTransition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`;

    let transform = 'translate3d(0, 0, 0)';
    if (!isVisible) {
      switch (animation) {
        case 'fade-up':
          transform = 'translate3d(0, 36px, 0)';
          break;
        case 'fade-down':
          transform = 'translate3d(0, -36px, 0)';
          break;
        case 'fade-left':
          transform = 'translate3d(-36px, 0, 0)';
          break;
        case 'fade-right':
          transform = 'translate3d(36px, 0, 0)';
          break;
        case 'zoom-in':
          transform = 'scale3d(0.94, 0.94, 1)';
          break;
        case 'fade':
        default:
          transform = 'translate3d(0, 0, 0)';
          break;
      }
    }

    return {
      opacity: isVisible ? 1 : 0,
      transform,
      transition: baseTransition,
      transitionDelay: `${delay}ms`,
      willChange: 'opacity, transform',
    };
  };

  return (
    <div ref={elementRef} style={getInitialStyle()} className={className}>
      {children}
    </div>
  );
};
