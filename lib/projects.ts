import { createClient } from '@/lib/supabase/server';
import type { ProjectRow } from '@/lib/supabase/types';

/**
 * Ces fonctions tournent uniquement côté serveur (Server Components).
 * La RLS Supabase garantit déjà que les visiteurs anonymes ne voient que les
 * projets publiés (published = true) — voir supabase/schema.sql.
 */

export async function getPublishedProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .order('project_date', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Erreur lors du chargement des projets :', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error(
      "Supabase n'est pas configuré (variables d'environnement manquantes) — la section Projets reste vide en attendant.",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export async function getFeaturedProjects(): Promise<ProjectRow[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('published', true)
      .eq('featured', true)
      .order('project_date', { ascending: false, nullsFirst: false });

    if (error) {
      console.error('Erreur lors du chargement des projets phares :', error.message);
      return [];
    }
    return data ?? [];
  } catch (err) {
    console.error(
      "Supabase n'est pas configuré (variables d'environnement manquantes).",
      err instanceof Error ? err.message : err
    );
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<ProjectRow | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single();

    if (error) return null;
    return data;
  } catch (err) {
    console.error(
      "Supabase n'est pas configuré (variables d'environnement manquantes).",
      err instanceof Error ? err.message : err
    );
    return null;
  }
}
