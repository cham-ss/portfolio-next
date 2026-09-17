'use client';

import { useEffect, useRef, ReactNode, ElementType, HTMLAttributes } from 'react';

interface RevealProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  className?: string;
  as?: ElementType;
}

/**
 * Reproduit le comportement de l'ancien script vanilla :
 * ajoute la classe "reveal" (déjà stylée dans globals.css) puis "visible"
 * dès que l'élément entre dans le viewport.
 */
export default function Reveal({ children, className = '', as: Tag = 'div', ...rest }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag ref={ref} className={`reveal ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
