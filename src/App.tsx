import { useCallback, useEffect, useState } from 'react';
import Navbar from './components/layout/Navbar';
import CustomCursor from './components/ui/CustomCursor';
import ScrollProgress from './components/ui/ScrollProgress';
import PageLoader from './components/ui/PageLoader';
import Hero from './components/sections/Hero';
import Marquee from './components/sections/Marquee';
import Projects from './components/sections/Projects';
import About from './components/sections/About';
import Experience from './components/sections/Experience';
import Testimonial from './components/sections/Testimonial';
import Contact from './components/sections/Contact';
import ProjectDetail from './components/project/ProjectDetail';
import { projects } from './data';
import { useTheme } from './hooks/useTheme';
import { useLenis } from './hooks/useLenis';

const SECTIONS = ['hero', 'work', 'about', 'journey', 'contact'] as const;

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const { isDark, toggleTheme } = useTheme();

  // Initialise Lenis smooth scroll (connects to GSAP ticker internally)
  useLenis();

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.4 }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollToSection = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (!el) return;
    el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const selectedProject = selectedProjectId
    ? projects.find((p) => p.id === selectedProjectId) ?? null
    : null;

  const handleOpenProject = useCallback((id: string) => setSelectedProjectId(id), []);
  const handleCloseProject = useCallback(() => setSelectedProjectId(null), []);
  const handleNavigateProject = useCallback((id: string) => setSelectedProjectId(id), []);

  return (
    <>
      <PageLoader />
      <CustomCursor />
      <ScrollProgress />

      <Navbar
        activeSection={activeSection}
        onNavClick={scrollToSection}
        isProjectView={false}
        isDark={isDark}
        onToggleTheme={toggleTheme}
      />

      <main>
        <Hero onScrollToWork={() => scrollToSection('work')} />
        <Marquee />
        <Projects projects={projects} onOpenProject={handleOpenProject} />
        <About />
        <Experience />
        <Testimonial />
        <Contact />
      </main>

      <ProjectDetail
        project={selectedProject}
        projects={projects}
        onClose={handleCloseProject}
        onNavigate={handleNavigateProject}
      />
    </>
  );
}
