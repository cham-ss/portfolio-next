import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProjectForm from '@/components/admin/ProjectForm';
import { updateProject } from '../../actions';

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data: project } = await supabase.from('projects').select('*').eq('id', id).single();

  if (!project) notFound();

  const boundUpdate = updateProject.bind(null, id);

  return (
    <div>
      <div className="admin-page-header">
        <h1>Edit Project</h1>
      </div>
      <ProjectForm action={boundUpdate} initialProject={project} submitLabel="Save changes" />
    </div>
  );
}
