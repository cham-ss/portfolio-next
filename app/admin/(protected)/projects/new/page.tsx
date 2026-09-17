import ProjectForm from '@/components/admin/ProjectForm';
import { createProject } from '../actions';

export default function NewProjectPage() {
  return (
    <div>
      <div className="admin-page-header">
        <h1>Add Project</h1>
      </div>
      <ProjectForm action={createProject} submitLabel="Create project" />
    </div>
  );
}
