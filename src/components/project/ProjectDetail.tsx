import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Project } from '../../data';
import { EASE } from '../../utils/motion';
import { getLenis } from '../../hooks/useLenis';

type Props = {
  project: Project | null;
  projects: Project[];
  onClose: () => void;
  onNavigate: (id: string) => void;
};

export default function ProjectDetail({ project, projects, onClose, onNavigate }: Props) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setImgLoaded(false);
    setImgError(false);
  }, [project?.id]);

  useEffect(() => {
    const lenis = getLenis();
    if (project) {
      // Pause Lenis so it doesn't fight the fixed overlay's scroll
      lenis?.stop();
      document.body.style.overflow = 'hidden';
      // Scroll the overlay container to top, not window
      scrollRef.current?.scrollTo({ top: 0 });
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }
    return () => {
      lenis?.start();
      document.body.style.overflow = '';
    };
  }, [project]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  const nextProject = project
    ? projects.find((p) => p.id === project.nextProject) ?? null
    : null;

  const showImage = imgLoaded && !imgError;

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key={project.id}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ duration: 0.7, ease: EASE }}
          ref={scrollRef}
          data-lenis-prevent
          className="fixed inset-0 z-[100] overflow-y-auto no-scrollbar bg-cream"
        >
          {/* Sticky nav */}
          <nav
            className="sticky top-0 z-10 flex items-center justify-between px-6 md:px-10 h-14"
            style={{
              background: 'color-mix(in srgb, var(--color-cream) 88%, transparent)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
            }}
          >
            <button onClick={onClose} className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-sm bg-ink" />
              <span className="text-xs font-semibold tracking-[0.15em] uppercase text-ink">
                John Kalu
              </span>
            </button>
            <button
              onClick={onClose}
              className="text-[11px] font-semibold tracking-[0.15em] uppercase text-ink flex items-center gap-1 hover:opacity-50 transition-opacity"
            >
              ← Back
            </button>
          </nav>

          <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-16 pb-32">
            {/* Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
            >
              <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-8">
                <span className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink/50">
                  {project.company}
                </span>
                <span className="text-ink/30">·</span>
                <span className="text-[11px] font-medium text-ink/50">{project.year}</span>
                <span className="text-ink/30">·</span>
                <span className="text-[11px] font-medium text-ink/50 uppercase tracking-[0.12em]">
                  {project.role}
                </span>
              </div>

              <h1
                className="font-black leading-[0.95] tracking-[-0.03em] text-ink max-w-4xl"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 6rem)' }}
              >
                {project.title}
              </h1>

              <p className="mt-6 text-[16px] leading-relaxed text-ink/65 max-w-xl">
                {project.description}
              </p>

              {/* View Website — tertiary button */}
              <a
                href={project.website}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-5 text-[11px] font-semibold tracking-[0.12em] uppercase text-ink/50 border border-ink/20 rounded-full px-4 py-2 hover:border-ink/50 hover:text-ink transition-all duration-200"
              >
                View Website
                <ExternalLink size={10} />
              </a>
            </motion.div>

            {/* Preview — full natural height, no cropping */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8, ease: EASE }}
              className="mt-10 relative rounded-2xl overflow-hidden"
              style={{ background: project.previewGradient }}
            >
              {/* Probe */}
              <img
                src={project.previewImage}
                alt=""
                className="hidden"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />

              {/* Full screenshot — block, natural height, no cropping */}
              {showImage && (
                <img
                  src={project.previewImage}
                  alt={`${project.company} website`}
                  className="w-full h-auto block"
                />
              )}

              {/* Fallback gradient when image hasn't loaded */}
              {!showImage && (
                <div style={{ height: '58vh' }} />
              )}

              {/* Company / Year chips */}
              <div className="absolute top-5 left-6 right-6 flex items-start justify-between z-10">
                <span className="bg-black/65 backdrop-blur-sm text-white/90 text-[10px] font-semibold tracking-[0.2em] uppercase rounded-full px-3 py-1.5">
                  {project.company}
                </span>
                <span className="bg-black/65 backdrop-blur-sm text-white/70 text-[10px] font-medium rounded-full px-3 py-1.5">
                  {project.year}
                </span>
              </div>

              {/* Metric badge */}
              <div className="absolute bottom-6 left-6 z-10">
                <div className="bg-black/75 backdrop-blur-sm rounded-2xl px-5 py-4">
                  <div
                    className="font-black leading-none tracking-[-0.04em] text-white"
                    style={{ fontSize: 'clamp(3.5rem, 10vw, 10rem)' }}
                  >
                    {project.metric}
                  </div>
                  <div className="text-[10px] font-semibold tracking-[0.22em] uppercase text-white/55 mt-2">
                    {project.metricLabel}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Two-column details */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: EASE }}
              className="mt-16 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20"
            >
              <div className="space-y-8">
                {[
                  { label: 'Role', value: project.role },
                  { label: 'Year', value: project.year },
                  { label: 'Scope', value: project.scope },
                  { label: 'Tags', value: project.tags.join(' · ') },
                ].map(({ label, value }) => (
                  <div key={label} className="border-t border-ink/10 pt-4">
                    <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink/40 mb-2">
                      {label}
                    </p>
                    <p className="text-[14px] font-medium text-ink leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-14">
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink/40 mb-5">
                    The Problem
                  </p>
                  <p className="text-[16px] leading-[1.75] text-ink/75 max-w-2xl">
                    {project.problem}
                  </p>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink/40 mb-6">
                    Approach
                  </p>
                  <ol className="space-y-5">
                    {project.approach.map((step, i) => (
                      <li key={i} className="flex gap-6">
                        <span className="text-[11px] font-bold text-ink/30 mt-1 tabular-nums shrink-0">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <p className="text-[15px] leading-[1.75] text-ink/75">{step}</p>
                      </li>
                    ))}
                  </ol>
                </div>

                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink/40 mb-5">
                    Outcome
                  </p>
                  <ul className="space-y-3">
                    {project.outcome.map((point, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <span className="text-ink/40 shrink-0 mt-0.5">→</span>
                        <span className="text-[15px] leading-[1.7] text-ink/75">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Footer nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="mt-24 pt-10 border-t border-ink/12 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6"
            >
              {nextProject && (
                <div>
                  <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-ink/40 mb-3">
                    Next Project
                  </p>
                  <button
                    onClick={() => onNavigate(nextProject.id)}
                    className="group flex items-center gap-3 hover:opacity-60 transition-opacity"
                  >
                    <span
                      className="font-bold tracking-[-0.02em] text-ink"
                      style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
                    >
                      {project.nextProjectLabel}
                    </span>
                    <span className="text-2xl group-hover:translate-x-2 transition-transform">→</span>
                  </button>
                </div>
              )}
              <button
                onClick={onClose}
                className="text-[11px] font-semibold tracking-[0.18em] uppercase text-ink/50 hover:text-ink transition-colors"
              >
                All Work
              </button>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
