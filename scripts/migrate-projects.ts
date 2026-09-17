/**
 * Script de migration ponctuel : insère les 6 projets actuellement en dur
 * dans data/projects.ts vers la table Supabase "projects".
 *
 * Usage (une seule fois, après avoir configuré .env.local) :
 *   npx tsx scripts/migrate-projects.ts
 *
 * Nécessite SUPABASE_SERVICE_ROLE_KEY (contourne la RLS pour l'import initial,
 * jamais utilisée ailleurs dans l'app — voir avertissement sécurité dans le README).
 */
import { createClient } from '@supabase/supabase-js';
import { projects as staticProjects } from '../data/projects';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error(
    '❌ NEXT_PUBLIC_SUPABASE_URL et SUPABASE_SERVICE_ROLE_KEY doivent être définies (dans .env.local) pour lancer cette migration.'
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function migrate() {
  console.log(`Migration de ${staticProjects.length} projet(s) vers Supabase...`);

  for (const p of staticProjects) {
    const { error } = await supabase.from('projects').upsert(
      {
        title: p.title,
        slug: p.slug,
        short_description: p.shortDescription,
        description: p.shortDescription,
        technologies: p.technologies,
        category: p.category[0] ?? 'frontend',
        github_url: p.githubUrl || null,
        demo_url: p.demoUrl || null,
        featured: false,
        published: true,
      },
      { onConflict: 'slug' }
    );

    if (error) {
      console.error(`  ✗ ${p.slug} :`, error.message);
    } else {
      console.log(`  ✓ ${p.slug}`);
    }
  }

  console.log('Migration terminée.');
}

migrate();
