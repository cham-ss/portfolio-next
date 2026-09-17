export type SkillCategory = 'frontend' | 'backend' | 'devops' | 'reseau';

export interface Skill {
  name: string;
  level: string;
  width: number;
  category: SkillCategory;
  iconBox: string; // classe couleur de la pastille d'icône
  iconSrc?: string; // image devicon (si applicable)
  iconClass?: string; // classe font-awesome (si pas d'image)
  iconColor?: string; // couleur inline pour l'icône font-awesome
}

export const skills: Skill[] = [
  // FRONTEND
  { name: 'HTML5', level: 'Expert', width: 95, category: 'frontend', iconBox: 'icon-orange', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
  { name: 'CSS3', level: 'Expert', width: 92, category: 'frontend', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', level: 'Avancé', width: 85, category: 'frontend', iconBox: 'icon-yellow', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
  { name: 'React', level: 'Avancé', width: 78, category: 'frontend', iconBox: 'icon-cyan', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
  { name: 'Vue.js', level: 'Intermédiaire', width: 65, category: 'frontend', iconBox: 'icon-green', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg' },
  { name: 'TypeScript', level: 'Intermédiaire', width: 60, category: 'frontend', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },

  // BACKEND
  { name: 'Node.js', level: 'Avancé', width: 75, category: 'backend', iconBox: 'icon-green', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
  { name: 'Python', level: 'Intermédiaire', width: 68, category: 'backend', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
  { name: 'Django', level: 'Intermédiaire', width: 62, category: 'backend', iconBox: 'icon-green', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
  { name: 'MySQL', level: 'Avancé', width: 74, category: 'backend', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
  { name: 'MongoDB', level: 'Intermédiaire', width: 62, category: 'backend', iconBox: 'icon-green', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
  { name: 'PostgreSQL', level: 'Intermédiaire', width: 65, category: 'backend', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },

  // DEVOPS
  { name: 'Docker', level: 'Intermédiaire', width: 70, category: 'devops', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
  { name: 'Git', level: 'Expert', width: 87, category: 'devops', iconBox: 'icon-orange', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
  { name: 'GitHub', level: 'Expert', width: 88, category: 'devops', iconBox: 'icon-gray', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
  { name: 'Linux', level: 'Expert', width: 90, category: 'devops', iconBox: 'icon-teal', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg' },
  { name: 'Figma', level: 'Intermédiaire', width: 72, category: 'devops', iconBox: 'icon-purple', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
  { name: 'Bash / Shell', level: 'Avancé', width: 82, category: 'devops', iconBox: 'icon-gray', iconClass: 'fas fa-terminal', iconColor: '#8890a4' },

  // RÉSEAUX
  { name: 'Windows Server', level: 'Expert', width: 92, category: 'reseau', iconBox: 'icon-blue', iconSrc: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/windows8/windows8-original.svg' },
  { name: 'TCP / IP', level: 'Expert', width: 88, category: 'reseau', iconBox: 'icon-teal', iconClass: 'fas fa-network-wired', iconColor: '#1d9e75' },
  { name: 'Sécurité réseau', level: 'Avancé', width: 78, category: 'reseau', iconBox: 'icon-blue', iconClass: 'fas fa-shield-alt', iconColor: '#378add' },
  { name: 'Cisco / VPN', level: 'Avancé', width: 72, category: 'reseau', iconBox: 'icon-teal', iconClass: 'fas fa-server', iconColor: '#1d9e75' },
  { name: 'Wireshark', level: 'Avancé', width: 76, category: 'reseau', iconBox: 'icon-orange', iconClass: 'fas fa-eye', iconColor: '#ef9f27' },
  { name: 'Pare-feu / UFW', level: 'Avancé', width: 80, category: 'reseau', iconBox: 'icon-gray', iconClass: 'fas fa-lock', iconColor: '#8890a4' },
];

export function barClassFor(category: SkillCategory) {
  return `tech-fill bar-${category}`;
}
