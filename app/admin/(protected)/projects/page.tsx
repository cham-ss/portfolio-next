import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { deleteProject, togglePublished, toggleFeatured } from './actions';
import DeleteProjectButton from '@/components/admin/DeleteProjectButton';
import ToggleButton from '@/components/admin/ToggleButton';

export default async function AdminProjectsPage() {
  const supabase = await createClient();
  const { data: projects, error } = await supabase
    .from('projects')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div>
      <div className="admin-page-header">
        <h1>Projects</h1>
        <Link className="btn-admin-primary" href="/admin/projects/new">
          <i className="fas fa-plus" /> Add Project
        </Link>
      </div>

      {error && (
        <div className="admin-form-error">
          <i className="fas fa-triangle-exclamation" /> Erreur de chargement : {error.message}
        </div>
      )}

      {!error && (!projects || projects.length === 0) && (
        <div className="admin-empty-state">
          <i className="fas fa-folder-open" />
          <p>No projects yet.</p>
          <Link className="btn-admin-primary" href="/admin/projects/new">
            <i className="fas fa-plus" /> Add your first project
          </Link>
        </div>
      )}

      {projects && projects.length > 0 && (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Project</th>
                <th>Category</th>
                <th>Status</th>
                <th>Featured</th>
                <th>Date</th>
                <th aria-label="Actions" />
              </tr>
            </thead>
            <tbody>
              {projects.map((project) => (
                <tr key={project.id}>
                  <td>
                    <div className="admin-project-cell">
                      <div className="admin-project-thumb">
                        {project.image_url ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={project.image_url} alt="" />
                        ) : (
                          <i className="fas fa-image" />
                        )}
                      </div>
                      <span>{project.title}</span>
                    </div>
                  </td>
                  <td>
                    <span className="admin-category-tag">{project.category}</span>
                  </td>
                  <td>
                    <ToggleButton
                      id={project.id}
                      current={project.published}
                      action={togglePublished}
                      labelOn="Published"
                      labelOff="Draft"
                      iconOn="fa-circle-check"
                      iconOff="fa-circle"
                    />
                  </td>
                  <td>
                    <ToggleButton
                      id={project.id}
                      current={project.featured}
                      action={toggleFeatured}
                      labelOn="Featured"
                      labelOff="—"
                      iconOn="fa-star"
                      iconOff="fa-star-o"
                    />
                  </td>
                  <td className="admin-table-date">
                    {project.project_date ? new Date(project.project_date).toLocaleDateString('fr-FR') : '—'}
                  </td>
                  <td>
                    <div className="admin-table-actions">
                      <Link className="admin-icon-btn" href={`/admin/projects/${project.id}/edit`} title="Edit">
                        <i className="fas fa-pen" />
                      </Link>
                      <DeleteProjectButton
                        projectId={project.id}
                        projectTitle={project.title}
                        deleteAction={deleteProject}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
