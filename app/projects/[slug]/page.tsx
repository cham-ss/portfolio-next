import Link from 'next/link';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import ScrollTopButton from '@/components/ScrollTopButton';
import LangSwitcher from '@/components/LangSwitcher';
import { projects, getProjectBySlug } from '@/data/projects';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <>
      <Header />
      <main>
        <section className="page-section" style={{ minHeight: '100vh' }}>
          <div className="page-content">
            <Link href="/#projets" className="project-detail-back">
              <i className="fas fa-arrow-left" /> Retour aux projets
            </Link>

            <div className="project-detail">
              {project.image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={project.image} alt={project.title} className="project-detail-image" />
              )}

              <div className="project-detail-meta">
                <span className="project-tag">{project.category}</span>
                {project.date && (
                  <span className="project-detail-date">
                    <i className="fas fa-calendar" /> {new Date(project.date).toLocaleDateString('fr-FR')}
                  </span>
                )}
              </div>

              <h1 className="project-detail-title">{project.title}</h1>
              <p className="project-detail-short">{project.shortDescription}</p>

              {project.technologies.length > 0 && (
                <div className="project-tags" style={{ marginBottom: 24 }}>
                  {project.technologies.map((tech) => (
                    <span className="project-tag" key={tech}>
                      {tech}
                    </span>
                  ))}
                </div>
              )}

              <div className="project-detail-links">
                {project.githubUrl && (
                  <a className="btn btn-secondary" href={project.githubUrl} target="_blank" rel="noreferrer">
                    <i className="fab fa-github" /> Code source
                  </a>
                )}
                {project.demoUrl && (
                  <a className="btn btn-primary" href={project.demoUrl} target="_blank" rel="noreferrer">
                    <i className="fas fa-external-link-alt" /> Live Demo
                  </a>
                )}
                {project.documentationUrl && (
                  <a className="btn btn-secondary" href={project.documentationUrl} target="_blank" rel="noreferrer">
                    <i className="fas fa-book" /> Documentation
                  </a>
                )}
              </div>

              {project.description && (
                <div className="project-detail-description">
                  {project.description.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <ScrollTopButton />
      <LangSwitcher />
    </>
  );
}