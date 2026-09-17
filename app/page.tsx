import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ScrollTopButton from '@/components/ScrollTopButton';
import LangSwitcher from '@/components/LangSwitcher';
import { getPublishedProjects } from '@/lib/projects';

export default async function HomePage() {
  const projects = await getPublishedProjects();

  return (
    <>
      <Header />
      <main id="pageContainer">
        <Hero />
        <Skills />
        <Projects projects={projects} />
        <Contact />
      </main>
      <ScrollTopButton />
      <LangSwitcher />
    </>
  );
}
