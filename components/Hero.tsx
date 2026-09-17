'use client';

import { useEffect, useState } from 'react';
import { useLanguage, typingTextsByLang } from '@/lib/i18n';

function useTypingEffect(texts: string[]) {
  const [display, setDisplay] = useState('');

  useEffect(() => {
    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let timeoutId: ReturnType<typeof setTimeout>;

    const tick = () => {
      const current = texts[textIndex];
      let delay = 100;

      if (isDeleting) {
        setDisplay(current.substring(0, charIndex - 1));
        charIndex--;
        delay = 50;
      } else {
        setDisplay(current.substring(0, charIndex + 1));
        charIndex++;
        delay = 100;
      }

      if (!isDeleting && charIndex === current.length) {
        isDeleting = true;
        delay = 1500;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % texts.length;
        delay = 500;
      }

      timeoutId = setTimeout(tick, delay);
    };

    timeoutId = setTimeout(tick, 1000);
    return () => clearTimeout(timeoutId);
  }, [texts]);

  return display;
}

export default function Hero() {
  const { t, lang } = useLanguage();
  const typed = useTypingEffect(typingTextsByLang[lang]);

  return (
    <section className="page-section" id="page-accueil" data-scroll>
      <div className="page-content">
        <div className="hero">
          <div className="content">
            <div className="hero-tag">{t('hero.tag')}</div>
            <h1>
              <span>{t('hero.greetingLine')}</span>
              <br />
              <span className="hero-name">Chamsoudine TAIROU</span>
            </h1>
            <h2>
              <span>{t('hero.role')}</span> <span className="typing-text">{typed}</span>
            </h2>
            <p>{t('hero.desc')}</p>

            <div className="cta-buttons">
              <a
                className="btn btn-primary"
                href="#projets"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('page-projets')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fas fa-code" /> <span>{t('hero.btnProjects')}</span>
              </a>
              <a
                className="btn btn-secondary"
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById('page-contact')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <i className="fas fa-paper-plane" /> <span>{t('hero.btnContact')}</span>
              </a>
            </div>

            <div className="social-icons">
              <a href="https://github.com/cham-ss" target="_blank" rel="noreferrer">
                <i className="fab fa-github" />
              </a>
              <a
                href="https://www.linkedin.com/in/amadou-chamsoudine-ta%C3%AFrou-04b8aa284"
                target="_blank"
                rel="noreferrer"
              >
                <i className="fab fa-linkedin-in" />
              </a>
              <a href="mailto:tairouamadouchamsoudine@gmail.com">
                <i className="fas fa-envelope" />
              </a>
            </div>
          </div>

          <div className="profile-container">
            <div className="border-outer" />
            <div className="border-middle" />
            <div className="border-inner" />
            <div className="border-container" />
            <div className="pulse-ring" />
            <div className="pulse-ring" />
            <div className="pulse-ring" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/Chamsoudine.jpeg" alt="Photo de profil" className="profile-img" />
          </div>
        </div>
      </div>
    </section>
  );
}
