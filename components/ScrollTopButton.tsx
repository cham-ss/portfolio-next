'use client';

import { useEffect, useState } from 'react';

export default function ScrollTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <button
      className={`scroll-top-btn ${visible ? 'visible' : ''}`}
      aria-label="Remonter en haut"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
    >
      <i className="fas fa-arrow-up" />
    </button>
  );
}
