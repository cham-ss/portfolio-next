// NOTE : ces données sont statiques pour l'instant (migration Next.js).
// Elles seront remplacées par une lecture depuis Supabase à l'étape "dashboard admin".
// La forme des champs a été rapprochée du futur modèle de données (title, slug,
// technologies, category, githubUrl, demoUrl...) pour faciliter cette migration.

export interface Project {
  slug: string;
  title: string;
  shortDescription: string;
  technologies: string[];
  category: string[]; // catégories utilisées pour un futur filtrage
  thumbIcon: string; // icône font-awesome utilisée en attendant une vraie image
  githubUrl?: string;
  demoUrl?: string;
  stars: number;
  forks: number;
}

export const projects: Project[] = [
  {
    slug: 'marketplace-e-commerce',
    title: 'Marketplace E-commerce',
    shortDescription: "Plateforme complète d'achat/vente avec authentification, panier, paiement et tableau de bord vendeur.",
    technologies: ['React', 'Node.js', 'MongoDB'],
    category: ['frontend', 'backend'],
    thumbIcon: 'fas fa-store',
    stars: 24,
    forks: 8,
  },
  {
    slug: 'dashboard-analytics',
    title: 'Dashboard Analytics',
    shortDescription: 'Interface de visualisation de données en temps réel avec graphiques interactifs et exports PDF/CSV.',
    technologies: ['Vue.js', 'Django', 'PostgreSQL'],
    category: ['frontend', 'design'],
    thumbIcon: 'fas fa-chart-line',
    stars: 18,
    forks: 5,
  },
  {
    slug: 'supervision-reseau',
    title: 'Supervision Réseau',
    shortDescription: "Script de monitoring réseau automatisé avec alertes email, logs et rapport d'état des serveurs.",
    technologies: ['Python', 'Linux', 'Bash'],
    category: ['reseau', 'backend'],
    thumbIcon: 'fas fa-network-wired',
    stars: 31,
    forks: 12,
  },
  {
    slug: 'chat-temps-reel',
    title: 'Chat Temps Réel',
    shortDescription: 'Application de messagerie instantanée avec salles multiples, notifications push et chiffrement des messages.',
    technologies: ['React', 'Socket.io', 'Express'],
    category: ['frontend', 'backend'],
    thumbIcon: 'fas fa-comments',
    stars: 42,
    forks: 17,
  },
  {
    slug: 'plateforme-e-learning',
    title: 'Plateforme E-learning',
    shortDescription: 'Système de gestion de cours en ligne avec suivi de progression, quiz interactifs et certificats.',
    technologies: ['HTML/CSS', 'JavaScript', 'PHP'],
    category: ['frontend', 'design'],
    thumbIcon: 'fas fa-graduation-cap',
    stars: 15,
    forks: 4,
  },
  {
    slug: 'infrastructure-securisee',
    title: 'Infrastructure Sécurisée',
    shortDescription: "Déploiement d'une infrastructure containerisée avec reverse proxy, SSL, pare-feu et monitoring.",
    technologies: ['Docker', 'Nginx', 'Linux'],
    category: ['reseau', 'backend'],
    thumbIcon: 'fas fa-shield-alt',
    stars: 27,
    forks: 9,
  },
];
