'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n';
import ThemeToggle from './ThemeToggle';

const PAGES = ['accueil', 'competences', 'projets', 'contact'] as const;
type PageName = (typeof PAGES)[number];

export default function Header() {
  const { t } = useLanguage();
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePage, setActivePage] = useState<PageName>('accueil');
  const navRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const pageName = entry.target.id.replace('page-', '') as PageName;
            setActivePage(pageName);
          }
        });
      },
      { threshold: 0.5 }
    );

    PAGES.forEach((p) => {
      const el = document.getElementById('page-' + p);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const goToPage = (pageName: PageName) => {
    const target = document.getElementById('page-' + pageName);
    if (!target) {
      // On n'est pas sur la page d'accueil (ex: /projects/mon-projet) : on y retourne.
      router.push('/#' + pageName);
      setMenuOpen(false);
      return;
    }
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
    history.replaceState(null, '', '#' + pageName);
  };

  return (
    <header id="header" className={scrolled ? 'scrolled' : ''}>
      <a
        className="logo"
        href="#accueil"
        onClick={(e) => {
          e.preventDefault();
          goToPage('accueil');
        }}
      >
        <i className="fas fa-code logo-icon" />
        <span className="logo-text">Portfolio</span>
      </a>
      <nav ref={navRef}>
        <div className="menu-toggle" onClick={() => setMenuOpen((v) => !v)}>
          <i className={menuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>
        <ul className={menuOpen ? 'active' : ''}>
          {PAGES.map((page) => (
            <li key={page}>
              <a
                href={'#' + page}
                className={activePage === page ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  goToPage(page);
                }}
              >
                {t(
                  page === 'accueil'
                    ? 'nav.home'
                    : page === 'competences'
                    ? 'nav.skills'
                    : page === 'projets'
                    ? 'nav.projects'
                    : 'nav.contact'
                )}
              </a>
            </li>
          ))}
        </ul>
        <ThemeToggle />
      </nav>
    </header>
  );
}
