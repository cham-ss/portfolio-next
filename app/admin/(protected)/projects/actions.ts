'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { validateProject, parseTechnologies, slugify, type ProjectFormValues } from '@/lib/validation';

/**
 * Toutes les actions ci-dessous re-vérifient l'authentification côté serveur
 * AVANT toute opération d'écriture. Le middleware protège déjà les pages /admin,
 * mais une Server Action peut techniquement être appelée directement — on ne
 * fait donc jamais confiance uniquement au routing pour la sécurité.
 */
async function requireAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('Non autorisé : authentification requise.');
  }

  return { supabase, user };
}

function extractFormValues(formData: FormData): ProjectFormValues {
  return {
    title: String(formData.get('title') || ''),
    slug: String(formData.get('slug') || ''),
    shortDescription: String(formData.get('shortDescription') || ''),
    description: String(formData.get('description') || ''),
    category: String(formData.get('category') || ''),
    technologies: String(formData.get('technologies') || ''),
    projectDate: String(formData.get('projectDate') || ''),
    githubUrl: String(formData.get('githubUrl') || ''),
    demoUrl: String(formData.get('demoUrl') || ''),
    documentationUrl: String(formData.get('documentationUrl') || ''),
    published: formData.get('published') === 'on',
    featured: formData.get('featured') === 'on',
  };
}

export interface ActionResult {
  success: boolean;
  errors?: Record<string, string>;
  message?: string;
}

export async function createProject(formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const values = extractFormValues(formData);
  const errors = validateProject(values);
  if (Object.keys(errors).length > 0) return { success: false, errors };

  const slug = values.slug.trim() || slugify(values.title);
  const imageUrl = String(formData.get('imageUrl') || '') || null;

  const { error } = await supabase.from('projects').insert({
    title: values.title.trim(),
    slug,
    short_description: values.shortDescription.trim(),
    description: values.description.trim() || null,
    image_url: imageUrl,
    technologies: parseTechnologies(values.technologies),
    category: values.category,
    project_date: values.projectDate || null,
    github_url: values.githubUrl || null,
    demo_url: values.demoUrl || null,
    documentation_url: values.documentationUrl || null,
    featured: values.featured,
    published: values.published,
  });

  if (error) {
    if (error.code === '23505') {
      return { success: false, errors: { slug: 'Ce slug est déjà utilisé par un autre projet.' } };
    }
    return { success: false, message: "Erreur lors de la création : " + error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
  redirect('/admin/projects');
}

export async function updateProject(id: string, formData: FormData): Promise<ActionResult> {
  const { supabase } = await requireAdmin();
  const values = extractFormValues(formData);
  const errors = validateProject(values);
  if (Object.keys(errors).length > 0) return { success: false, errors };

  const slug = values.slug.trim() || slugify(values.title);
  const imageUrl = String(formData.get('imageUrl') || '') || null;

  const { error } = await supabase
    .from('projects')
    .update({
      title: values.title.trim(),
      slug,
      short_description: values.shortDescription.trim(),
      description: values.description.trim() || null,
      image_url: imageUrl,
      technologies: parseTechnologies(values.technologies),
      category: values.category,
      project_date: values.projectDate || null,
      github_url: values.githubUrl || null,
      demo_url: values.demoUrl || null,
      documentation_url: values.documentationUrl || null,
      featured: values.featured,
      published: values.published,
    })
    .eq('id', id);

  if (error) {
    if (error.code === '23505') {
      return { success: false, errors: { slug: 'Ce slug est déjà utilisé par un autre projet.' } };
    }
    return { success: false, message: 'Erreur lors de la mise à jour : ' + error.message };
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
  revalidatePath(`/projects/${slug}`);
  redirect('/admin/projects');
}

export async function deleteProject(id: string): Promise<void> {
  const { supabase } = await requireAdmin();

  // Récupère l'image associée pour la supprimer aussi du storage
  const { data: project } = await supabase.from('projects').select('image_url').eq('id', id).single();

  await supabase.from('projects').delete().eq('id', id);

  if (project?.image_url) {
    const path = project.image_url.split('/project-images/')[1];
    if (path) await supabase.storage.from('project-images').remove([path]);
  }

  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function togglePublished(id: string, current: boolean): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.from('projects').update({ published: !current }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/projects');
}

export async function toggleFeatured(id: string, current: boolean): Promise<void> {
  const { supabase } = await requireAdmin();
  await supabase.from('projects').update({ featured: !current }).eq('id', id);
  revalidatePath('/');
  revalidatePath('/admin/projects');
}
