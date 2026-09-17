import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';

export default async function AdminDashboardPage() {
  const supabase = await createClient();
  const { data: projects } = await supabase
    .from('projects')
    .select('id, published, featured');

  const total = projects?.length ?? 0;
  const published = projects?.filter((p) => p.published).length ?? 0;
  const drafts = total - published;
  const featured = projects?.filter((p) => p.featured).length ?? 0;

  const stats = [
    { label: 'Total Projects', value: total, icon: 'fa-diagram-project' },
    { label: 'Published', value: published, icon: 'fa-circle-check', accent: true },
    { label: 'Drafts', value: drafts, icon: 'fa-file-pen' },
    { label: 'Featured', value: featured, icon: 'fa-star' },
  ];

  return (
    <div>
      <div className="admin-page-header">
        <h1>Overview</h1>
        <Link className="btn-admin-primary" href="/admin/projects/new">
          <i className="fas fa-plus" /> Add Project
        </Link>
      </div>

      <div className="admin-stats-grid">
        {stats.map((s) => (
          <div className="admin-stat-card" key={s.label}>
            <div className={`admin-stat-icon ${s.accent ? 'accent' : ''}`}>
              <i className={`fas ${s.icon}`} />
            </div>
            <div>
              <div className="admin-stat-value">{s.value}</div>
              <div className="admin-stat-label">{s.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2>Quick access</h2>
        </div>
        <div className="admin-quick-links">
          <Link href="/admin/projects">
            <i className="fas fa-list" /> Voir tous les projets
          </Link>
          <Link href="/admin/projects/new">
            <i className="fas fa-plus" /> Ajouter un nouveau projet
          </Link>
        </div>
      </div>
    </div>
  );
}
