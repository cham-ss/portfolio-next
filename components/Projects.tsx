'use client';

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import type { ProjectRow } from '@/lib/supabase/types';
import Reveal from './Reveal';

const CATEGORY_ICONS: Record<string, string> = {
  frontend: 'fas fa-code',
  backend: 'fas fa-server',
  devops: 'fas fa-shield-alt',
  reseau: 'fas fa-network-wired',
  design: 'fas fa-palette',
};

interface ProjectsProps {
  projects: ProjectRow[];
}

export default function Projects({ projects }: ProjectsProps) {
  const { t } = useLanguage();

  return (
    <section className="page-section" id="page-projets" data-scroll>
      <div className="page-content">
        <div className="section-header">
          <h2 className="section-title">{t('projects.title')}</h2>
          <p className="section-desc">{t('projects.desc')}</p>
          <div className="divider" />
        </div>

        {projects.length === 0 ? (
          <div className="admin-empty-state" style={{ background: 'transparent', border: 'none' }}>
            <i className="fas fa-folder-open" />
            <p>Aucun projet publié pour le moment.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <Reveal key={project.id} className="project-card" as="div" data-category={project.category}>
                {project.featured && (
                  <div className="project-featured-badge">
                    <i className="fas fa-star" /> Featured
                  </div>
                )}
                <div className="project-thumb">
                  {project.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={project.image_url} alt={project.title} className="project-thumb-img" />
                  ) : (
                    <>
                      <div className="project-thumb-gradient" />
                      <i className={`${CATEGORY_ICONS[project.category] || 'fas fa-diagram-project'} project-thumb-icon`} />
                    </>
                  )}
                  <div className="project-overlay">
                    {project.github_url && (
                      <a href={project.github_url} target="_blank" rel="noreferrer" title="Code source">
                        <i className="fab fa-github" />
                      </a>
                    )}
                    {project.demo_url && (
                      <a href={project.demo_url} target="_blank" rel="noreferrer" title="Voir en live">
                        <i className="fas fa-external-link-alt" />
                      </a>
                    )}
                    <Link href={`/projects/${project.slug}`} title="Voir le détail">
                      <i className="fas fa-arrow-right" />
                    </Link>
                  </div>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {project.technologies.map((tech) => (
                      <span className="project-tag" key={tech}>
                        {tech}
                      </span>
                    ))}
                  </div>
                  <h3 className="project-title">
                    <Link href={`/projects/${project.slug}`}>{project.title}</Link>
                  </h3>
                  <p className="project-desc">{project.short_description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
