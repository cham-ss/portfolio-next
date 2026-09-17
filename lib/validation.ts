export interface ProjectFormValues {
  title: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  technologies: string; // saisie brute séparée par des virgules
  projectDate: string;
  githubUrl: string;
  demoUrl: string;
  documentationUrl: string;
  published: boolean;
  featured: boolean;
}

export const CATEGORIES = [
  'frontend',
  'backend',
  'devops',
  'reseau',
  'design',
] as const;

/**
 * Génère un slug URL-safe à partir d'un titre.
 * Ex: "Network Traffic Analysis" -> "network-traffic-analysis"
 */
export function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // retire les accents
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-{2,}/g, '-');
}

function isValidUrl(value: string): boolean {
  if (!value) return true; // champ optionnel
  try {
    const url = new URL(value);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Validation partagée — utilisée à la fois côté client (retour immédiat à
 * l'utilisateur) et côté serveur (jamais faire confiance au client seul).
 */
export function validateProject(values: ProjectFormValues): Record<string, string> {
  const errors: Record<string, string> = {};

  if (!values.title.trim()) errors.title = 'Le titre est obligatoire.';
  else if (values.title.length > 120) errors.title = 'Le titre est trop long (120 caractères max).';

  const slug = values.slug.trim() || slugify(values.title);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    errors.slug = 'Le slug ne doit contenir que des minuscules, chiffres et tirets.';
  }

  if (!values.shortDescription.trim()) errors.shortDescription = 'La description courte est obligatoire.';
  else if (values.shortDescription.length > 220)
    errors.shortDescription = 'La description courte est trop longue (220 caractères max).';

  if (!CATEGORIES.includes(values.category as (typeof CATEGORIES)[number])) {
    errors.category = 'Sélectionne une catégorie valide.';
  }

  if (!isValidUrl(values.githubUrl)) errors.githubUrl = 'URL GitHub invalide.';
  if (!isValidUrl(values.demoUrl)) errors.demoUrl = 'URL de démo invalide.';
  if (!isValidUrl(values.documentationUrl)) errors.documentationUrl = 'URL de documentation invalide.';

  if (values.projectDate && Number.isNaN(Date.parse(values.projectDate))) {
    errors.projectDate = 'Date invalide.';
  }

  return errors;
}

export function parseTechnologies(raw: string): string[] {
  return raw
    .split(',')
    .map((t) => t.trim())
    .filter(Boolean)
    .slice(0, 20);
}
