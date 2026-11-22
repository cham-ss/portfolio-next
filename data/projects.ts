export type Project = {
  slug: string; // identifiant dans l'URL : /projects/<slug> (minuscules, chiffres, tirets)
  title: string;
  shortDescription: string;
  description?: string; // texte long affiché sur la page de détail
  image?: string; // chemin dans /public, ex: '/projects/mon-projet.jpg'
  technologies: string[];
  category: 'frontend' | 'backend' | 'devops' | 'reseau' | 'design';
  date?: string; // format 'AAAA-MM-JJ'
  githubUrl?: string;
  demoUrl?: string;
  documentationUrl?: string;
  featured?: boolean;
};

// Pour ajouter un projet : copie un bloc ci-dessous, remplis-le, sauvegarde.
export const projects: Project[] = [
  // {
  //   slug: 'mon-premier-projet',
  //   title: 'Mon premier projet',
  //   shortDescription: 'Une phrase qui résume le projet.',
  //   description: 'Un texte plus long pour la page de détail.',
  //   image: '/projects/mon-premier-projet.jpg',
  //   technologies: ['Linux', 'Docker'],
  //   category: 'devops',
  //   date: '2026-09-01',
  //   githubUrl: 'https://github.com/...',
  //   demoUrl: '',
  //   documentationUrl: '',
  //   featured: false,
  // },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}