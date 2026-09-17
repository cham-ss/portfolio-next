'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type Lang = 'fr' | 'en';

export const translations: Record<Lang, Record<string, string>> = {
  fr: {
    'nav.home': 'Accueil', 'nav.skills': 'Compétences', 'nav.projects': 'Projets', 'nav.contact': 'Contact',
    'hero.tag': 'Disponible pour des missions',
    'hero.greetingLine': 'Bonjour, je suis',
    'hero.role': 'Senior',
    'hero.desc': "Technicien polyvalent formé en Administration Systèmes & Réseaux, avec des bases en développement et génie logiciel. Capable de prendre en charge des projets techniques de bout en bout, quelle que soit la stack ou l'environnement.",
    'hero.btnProjects': 'Voir mes projets',
    'hero.btnContact': 'Me contacter',
    'skills.title': 'Mes Compétences',
    'skills.desc': "Un ensemble de technologies et d'outils que j'utilise pour créer des expériences numériques performantes.",
    'projects.title': 'Mes Projets',
    'projects.desc': 'Une sélection de projets personnels et professionnels illustrant mes compétences techniques et créatives.',
    'contact.title': 'Me Contacter',
    'contact.intro': 'Disponible pour des missions freelance, des collaborations ou des opportunités à plein temps. Mon objectif est de créer des solutions techniques qui font vraiment la différence.',
    'contact.available': 'Actuellement disponible pour de nouveaux projets',
    'contact.email': 'Email', 'contact.phone': 'Téléphone', 'contact.location': 'Localisation',
    'contact.availability': 'Disponibilité', 'contact.hours': '24h/24 — 7j/7',
    'contact.formTitle': 'Envoyer un message',
    'contact.name': 'Nom complet *', 'contact.namePh': 'Votre nom complet',
    'contact.emailLabel': 'Email *', 'contact.emailPh': 'votre mail',
    'contact.subject': 'Sujet', 'contact.subjectPh': '-- Sélectionner un sujet --',
    'contact.subject1': 'Projet Freelance', 'contact.subject2': 'Collaboration',
    'contact.subject3': "Offre d'emploi", 'contact.subject4': 'Question technique', 'contact.subject5': 'Autre',
    'contact.budget': 'Budget estimé', 'contact.budgetPh': '-- Budget (optionnel) --', 'contact.budget5': 'À discuter',
    'contact.message': 'Message *', 'contact.messagePh': 'Décrivez votre projet ou votre demande…',
    'contact.send': 'Envoyer le message', 'contact.sendSuccess': 'Message envoyé avec succès !',
  },
  en: {
    'nav.home': 'Home', 'nav.skills': 'Skills', 'nav.projects': 'Projects', 'nav.contact': 'Contact',
    'hero.tag': 'Available for new opportunities',
    'hero.greetingLine': "Hello, I'm",
    'hero.role': 'Senior',
    'hero.desc': "Versatile technician trained in Systems & Network Administration, with a solid foundation in software development. Able to handle technical projects end-to-end, regardless of the stack or environment.",
    'hero.btnProjects': 'View my projects',
    'hero.btnContact': 'Contact me',
    'skills.title': 'My Skills',
    'skills.desc': 'A set of technologies and tools I use to build high-performing digital experiences.',
    'projects.title': 'My Projects',
    'projects.desc': 'A selection of personal and professional projects showcasing my technical and creative skills.',
    'contact.title': 'Contact Me',
    'contact.intro': 'Available for freelance work, collaborations or full-time opportunities. My goal is to build technical solutions that truly make a difference.',
    'contact.available': 'Currently available for new projects',
    'contact.email': 'Email', 'contact.phone': 'Phone', 'contact.location': 'Location',
    'contact.availability': 'Availability', 'contact.hours': '24/7',
    'contact.formTitle': 'Send a message',
    'contact.name': 'Full name *', 'contact.namePh': 'Your full name',
    'contact.emailLabel': 'Email *', 'contact.emailPh': 'your email',
    'contact.subject': 'Subject', 'contact.subjectPh': '-- Select a subject --',
    'contact.subject1': 'Freelance project', 'contact.subject2': 'Collaboration',
    'contact.subject3': 'Job offer', 'contact.subject4': 'Technical question', 'contact.subject5': 'Other',
    'contact.budget': 'Estimated budget', 'contact.budgetPh': '-- Budget (optional) --', 'contact.budget5': 'To discuss',
    'contact.message': 'Message *', 'contact.messagePh': 'Describe your project or request…',
    'contact.send': 'Send message', 'contact.sendSuccess': 'Message sent successfully!',
  },
};

export const typingTextsByLang: Record<Lang, string[]> = {
  fr: ['Développeur Frontend', 'UI/UX Designer', 'Administrateur Systèmes', 'Consultant Web'],
  en: ['Frontend Developer', 'UI/UX Designer', 'Systems Administrator', 'Web Consultant'],
};

interface LanguageContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('fr');

  useEffect(() => {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'fr' || saved === 'en') setLangState(saved);
  }, []);

  const setLang = (newLang: Lang) => {
    setLangState(newLang);
    try {
      window.localStorage.setItem('lang', newLang);
    } catch {
      /* ignore */
    }
    document.documentElement.lang = newLang;
  };

  const t = (key: string) => translations[lang][key] ?? key;

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}
