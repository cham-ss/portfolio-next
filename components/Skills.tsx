'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n';
import { skills, barClassFor } from '@/data/skills';
import Reveal from './Reveal';

export default function Skills() {
  const { t } = useLanguage();
  const gridRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const bar = entry.target.querySelector<HTMLElement>('.tech-fill');
            if (bar) {
              const width = bar.getAttribute('data-width');
              setTimeout(() => {
                bar.style.width = width + '%';
              }, 200);
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    grid.querySelectorAll('.tech-card').forEach((card) => observer.observe(card));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="page-section" id="page-competences" data-scroll>
      <div className="page-content">
        <div className="section-header">
          <h2 className="section-title">{t('skills.title')}</h2>
          <p className="section-desc">{t('skills.desc')}</p>
          <div className="divider" />
        </div>

        <div className="tech-grid" ref={gridRef}>
          {skills.map((skill) => (
            <Reveal key={skill.name} className="tech-card" as="div" data-cat={skill.category}>
              <div className={`tech-icon-box ${skill.iconBox}`}>
                {skill.iconSrc ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={skill.iconSrc} width={28} height={28} alt={skill.name} />
                ) : (
                  <i className={skill.iconClass} style={{ color: skill.iconColor, fontSize: '1.4rem' }} />
                )}
              </div>
              <div>
                <div className="tech-name">{skill.name}</div>
                <div className="tech-level">{skill.level}</div>
                <div className="tech-bar">
                  <div className={barClassFor(skill.category)} data-width={skill.width} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
