import { useState, useRef } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'framer-motion';
import { EASE } from '../../utils/motion';
import { useTilt } from '../../hooks/useTilt';
import type { Project } from '../../data';

type Props = {
  projects: Project[];
  onOpenProject: (id: string) => void;
};

/* ── Editorial Image Card ────────────────────────────────────────────────── */
function ProjectImage({
  project,
  isInView,
  onOpen,
}: {
  project: Project;
  isInView: boolean;
  onOpen: () => void;
}) {
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const { rotateX, rotateY, glossBg, boxShadow, onMouseMove, onMouseLeave } = useTilt(5);
  const showImage = imgLoaded && !imgError;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.96 }}
      animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 1.0, ease: EASE, delay: 0.15 }}
      style={{ perspective: '1200px', perspectiveOrigin: '50% 50%' }}
      onClick={onOpen}
    >
      <motion.div
        className="relative overflow-hidden rounded-3xl cursor-pointer group"
        style={{
          aspectRatio: '4/3',
          rotateX,
          rotateY,
          boxShadow,
          background: showImage ? 'transparent' : project.previewGradient,
          transformStyle: 'preserve-3d',
          willChange: 'transform, box-shadow',
        }}
        onMouseMove={onMouseMove as (e: React.MouseEvent<HTMLDivElement>) => void}
        onMouseLeave={onMouseLeave as (e: React.MouseEvent<HTMLDivElement>) => void}
      >
        {/* Probe */}
        <img
          src={project.previewImage}
          alt=""
          className="hidden"
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgError(true)}
        />

        {/* Image */}
        {showImage && (
          <img
            src={project.previewImage}
            alt={project.company}
            className="w-full h-full object-cover absolute inset-0 transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.055]"
            style={{ objectPosition: project.imagePosition ?? 'top', willChange: 'transform' }}
          />
        )}

        {/* Specular gloss */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-10 rounded-3xl"
          style={{ background: glossBg }}
        />

        {/* Metric badge */}
        <div className="absolute bottom-6 left-6 z-20">
          <div className="bg-black/78 backdrop-blur-md rounded-2xl px-5 py-4">
            <div
              className="font-black leading-none tracking-[-0.04em] text-white"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)' }}
            >
              {project.metric}
            </div>
            <div className="text-[9px] font-semibold tracking-[0.22em] uppercase text-white/50 mt-2">
              {project.metricLabel}
            </div>
          </div>
        </div>

        {/* Hover border glow */}
        <div className="absolute inset-0 ring-inset ring-0 group-hover:ring-1 group-hover:ring-white/30 rounded-3xl transition-all duration-500 z-30" />
      </motion.div>
    </motion.div>
  );
}

/* ── CTA Arrow — animated idle + hover ──────────────────────────────────── */
function CTAArrow() {
  return (
    <motion.span
      className="inline-block"
      animate={{ x: [0, 4, 0] }}
      transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
    >
      →
    </motion.span>
  );
}

/* ── Editorial Text Column ───────────────────────────────────────────────── */
function ProjectText({
  project,
  isInView,
  onOpen,
}: {
  project: Project;
  isInView: boolean;
  onOpen: () => void;
}) {
  /* Magnetic CTA */
  const btnRef = useRef<HTMLButtonElement>(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const bx = useSpring(rawX, { stiffness: 260, damping: 20 });
  const by = useSpring(rawY, { stiffness: 260, damping: 20 });

  const handleBtnMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    rawX.set((e.clientX - r.left - r.width / 2) * 0.3);
    rawY.set((e.clientY - r.top - r.height / 2) * 0.3);
  };

  const displayNum = project.number;

  return (
    <div className="flex flex-col justify-center gap-7 py-8 md:py-0">

      {/* Number */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
        aria-hidden="true"
      >
        <span className="text-[11px] font-black tracking-[0.35em] uppercase text-muted">
          {displayNum}
        </span>
      </motion.div>

      {/* Company name / title */}
      <div className="overflow-hidden">
        <motion.h3
          initial={{ y: '110%', opacity: 0 }}
          animate={isInView ? { y: '0%', opacity: 1 } : {}}
          transition={{ duration: 0.85, ease: EASE, delay: 0.12 }}
          className="font-black leading-[1.0] tracking-[-0.03em] text-ink"
          style={{ fontSize: 'clamp(2.6rem, 4.2vw, 4.8rem)' }}
        >
          {project.company}
        </motion.h3>
      </div>

      {/* Tags / Industry */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE, delay: 0.26 }}
        className="flex flex-wrap gap-2"
      >
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="text-[9px] font-bold tracking-[0.22em] uppercase text-ink/45 border border-ink/12 rounded-full px-3 py-1.5"
          >
            {tag}
          </span>
        ))}
      </motion.div>

      {/* One-liner description */}
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.65, ease: EASE, delay: 0.36 }}
        className="text-[15px] leading-[1.72] text-ink/58 max-w-[380px]"
      >
        {project.description}
      </motion.p>

      {/* View Case Study CTA */}
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, ease: EASE, delay: 0.48 }}
      >
        <motion.button
          ref={btnRef}
          onClick={onOpen}
          onMouseMove={handleBtnMove}
          onMouseLeave={() => { rawX.set(0); rawY.set(0); }}
          style={{ x: bx, y: by }}
          whileTap={{ scale: 0.95 }}
          className="group inline-flex items-center gap-3 text-[11px] font-bold tracking-[0.18em] uppercase text-ink border border-ink/18 rounded-full px-6 py-3 hover:bg-ink hover:text-page hover:border-ink transition-all duration-300"
        >
          View Case Study
          <CTAArrow />
        </motion.button>
      </motion.div>
    </div>
  );
}

/* ── Project Row — alternating editorial layout ──────────────────────────── */
function ProjectRow({
  project,
  index,
  onOpen,
}: {
  project: Project;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });
  const isReversed = index % 2 === 1;

  /* Horizontal rule reveal */
  const lineRef = useRef<HTMLDivElement>(null);

  return (
    <div className="max-w-[1400px] mx-auto px-6 md:px-10">
      {/* Divider */}
      <motion.div
        ref={lineRef}
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1.1, ease: EASE }}
        style={{ transformOrigin: 'left' }}
        className="h-px bg-ink/8"
      />

      {/* Editorial grid */}
      <div
        ref={ref}
        className={`grid grid-cols-1 items-center gap-10 md:gap-16 py-20 md:py-28 ${
          isReversed ? 'md:grid-cols-[3fr_2fr]' : 'md:grid-cols-[2fr_3fr]'
        }`}
      >
        {/* Text — swaps order on desktop when reversed */}
        <div className={isReversed ? 'md:order-2' : 'md:order-1'}>
          <ProjectText project={project} isInView={isInView} onOpen={onOpen} />
        </div>

        {/* Image — swaps order on desktop when reversed */}
        <div className={isReversed ? 'md:order-1' : 'md:order-2'}>
          <ProjectImage project={project} isInView={isInView} onOpen={onOpen} />
        </div>
      </div>
    </div>
  );
}

/* ── Section ─────────────────────────────────────────────────────────────── */
export default function Projects({ projects, onOpenProject }: Props) {
  return (
    <section id="work" className="bg-page">
      {/* Section header */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-20 pb-8 flex items-baseline justify-between">
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted"
        >
          Selected Work
        </motion.span>
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.1 }}
          className="text-[11px] font-medium text-muted hidden md:block"
        >
          2021 — 2024
        </motion.span>
      </div>

      {/* Project rows */}
      {projects.map((project, i) => (
        <ProjectRow
          key={project.id}
          project={project}
          index={i}
          onOpen={() => onOpenProject(project.id)}
        />
      ))}

      {/* Bottom border */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="h-px bg-ink/8" />
      </div>
    </section>
  );
}
