import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import Contact from '@/components/Contact';
import ScrollTopButton from '@/components/ScrollTopButton';
import LangSwitcher from '@/components/LangSwitcher';

export default function HomePage() {
  return (
    <>
      <Header />
      <main id="pageContainer">
        <Hero />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <ScrollTopButton />
      <LangSwitcher />
    </>
  );
}