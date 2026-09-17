'use client';

import { useEffect, useRef, useState } from 'react';
import { useLanguage, Lang } from '@/lib/i18n';

const FlagFR = () => (
  <svg viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#002395" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ED2939" />
  </svg>
);

const FlagEN = () => (
  <svg viewBox="0 0 60 30">
    <rect width="60" height="30" fill="#012169" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#fff" strokeWidth="6" />
    <path d="M0,0 60,30 M60,0 0,30" stroke="#C8102E" strokeWidth="2" />
    <path d="M30,0 30,30 M0,15 60,15" stroke="#fff" strokeWidth="10" />
    <path d="M30,0 30,30 M0,15 60,15" stroke="#C8102E" strokeWidth="6" />
  </svg>
);

export default function LangSwitcher() {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDocClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('click', onDocClick);
    return () => document.removeEventListener('click', onDocClick);
  }, []);

  const choose = (next: Lang) => {
    setOpen(false);
    if (next !== lang) setLang(next);
  };

  return (
    <div className={`lang-switcher ${open ? 'open' : ''}`} ref={ref}>
      <button
        className="lang-btn"
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen((v) => !v);
        }}
      >
        <span className="lang-flag">{lang === 'fr' ? <FlagFR /> : <FlagEN />}</span>
        <span>{lang.toUpperCase()}</span>
        <i className="fas fa-chevron-up" />
      </button>
      <div className="lang-menu">
        <button className={`lang-option ${lang === 'fr' ? 'active' : ''}`} onClick={() => choose('fr')}>
          <span className="lang-flag"><FlagFR /></span>
          Français
          {lang === 'fr' && <i className="fas fa-check" />}
        </button>
        <button className={`lang-option ${lang === 'en' ? 'active' : ''}`} onClick={() => choose('en')}>
          <span className="lang-flag"><FlagEN /></span>
          English
          {lang === 'en' && <i className="fas fa-check" />}
        </button>
      </div>
    </div>
  );
}
