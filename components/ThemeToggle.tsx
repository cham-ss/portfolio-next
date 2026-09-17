'use client';

import { useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

export default function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme>('dark');

  useEffect(() => {
    const current = (document.documentElement.getAttribute('data-theme') as Theme) || 'dark';
    setThemeState(current);
  }, []);

  const applyTheme = (next: Theme) => {
    document.documentElement.setAttribute('data-theme', next);
    try {
      window.localStorage.setItem('theme', next);
    } catch {
      /* ignore */
    }
    setThemeState(next);
  };

  const toggle = () => applyTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <button
      className="theme-toggle"
      type="button"
      role="switch"
      aria-checked={theme === 'dark'}
      aria-label={
        theme === 'dark'
          ? 'Mode sombre activé — cliquer pour passer en mode clair'
          : 'Mode clair activé — cliquer pour passer en mode sombre'
      }
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      }}
    >
      <i className="fas fa-sun theme-icon icon-sun" aria-hidden="true" />
      <i className="fas fa-moon theme-icon icon-moon" aria-hidden="true" />
      <span className="theme-thumb" />
    </button>
  );
}
