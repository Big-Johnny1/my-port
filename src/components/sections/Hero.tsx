import { useRef } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  type Variants,
} from 'framer-motion';
import MagneticButton from '../ui/MagneticButton';
import { EASE } from '../../utils/motion';

const words = ['Ui/Ux', 'designer', 'crafting', 'products', 'that', 'drive', 'growth.'];

type Props = { onScrollToWork: () => void };

function Blob({
  left, top, size, color, dx, dy, delay,
}: {
  left: string; top: string; size: number; color: string;
  dx: number[]; dy: number[]; delay: number;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        left, top, width: size, height: size,
        background: color,
        filter: 'blur(72px)',
        transform: 'translate(-50%,-50%)',
        willChange: 'transform',
      }}
      animate={{ x: dx, y: dy }}
      transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay, times: [0, 0.33, 0.66, 1] }}
    />
  );
}

function StatusCard() {
  return (
    <div className="bg-[#0d0d0d] dark:bg-[#1e1c18] rounded-2xl px-5 py-4 shadow-2xl shadow-black/20 select-none">
      <div className="flex items-center gap-2 mb-2.5">
        <motion.span
          className="w-2 h-2 rounded-full bg-emerald-400 shrink-0"
          animate={{ opacity: [1, 0.35, 1], scale: [1, 0.85, 1] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
        <span className="text-[10px] font-bold tracking-[0.22em] uppercase text-white">
          Available
        </span>
      </div>
      <p className="text-[13px] font-medium text-white/55 leading-snug">
        For new projects &amp; collaborations
      </p>
      <div className="mt-3 pt-3 border-t border-white/10 flex items-center gap-1.5">
        <span className="text-[9px] text-white/30 tracking-[0.12em] uppercase">Based in</span>
        <span className="text-[9px] font-semibold text-white/50 tracking-[0.1em] uppercase">Lagos, Nigeria</span>
      </div>
    </div>
  );
}

function StatsCard() {
  const stats = [
    { value: '5+', label: 'Years' },
    { value: '25+', label: 'Projects' },
    { value: '75+', label: 'Students' },
  ];
  return (
    <div className="bg-sand border border-ink/10 rounded-2xl px-5 py-4 shadow-lg shadow-ink/6 select-none">
      <p className="text-[9px] font-bold tracking-[0.22em] uppercase text-muted mb-4">
        At a glance
      </p>
      <div className="grid grid-cols-3 gap-2 text-center">
        {stats.map((s) => (
          <div key={s.label}>
            <div
              className="font-black text-ink leading-none tracking-[-0.03em]"
              style={{ fontSize: 'clamp(1.3rem, 2.5vw, 1.8rem)' }}
            >
              {s.value}
            </div>
            <div className="text-[8px] font-semibold tracking-[0.18em] uppercase text-muted mt-1.5">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* Word → split into chars for staggered reveal */
function AnimatedWord({ word, delay, isGrowth }: { word: string; delay: number; isGrowth?: boolean }) {
  const chars = word.split('');
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.028, delayChildren: delay } },
  };
  const char: Variants = {
    hidden: { opacity: 0, y: 60, filter: 'blur(12px)', rotateX: -30 },
    show: {
      opacity: 1, y: 0, filter: 'blur(0px)', rotateX: 0,
      transition: { duration: 0.65, ease: EASE },
    },
  };

  return (
    <motion.span
      variants={container}
      initial="hidden"
      animate="show"
      className={`inline-flex mr-[0.22em]${isGrowth ? ' growth-word' : ''}`}
      style={{ perspective: '400px' }}
    >
      {chars.map((c, i) => (
        <motion.span key={i} variants={char} className="inline-block" style={{ willChange: 'transform, opacity, filter' }}>
          {c}
        </motion.span>
      ))}
    </motion.span>
  );
}

export default function Hero({ onScrollToWork }: Props) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const mainY = useTransform(scrollYProgress, [0, 1], ['0%', '22%']);
  const mainOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const bgTextY = useTransform(scrollYProgress, [0, 1], ['0%', '-7%']);
  const bgTextScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 26, mass: 0.6 });
  const springY = useSpring(mouseY, { stiffness: 100, damping: 26, mass: 0.6 });

  const cardAX = useTransform(springX, [-0.5, 0.5], [-10, 10]);
  const cardAY = useTransform(springY, [-0.5, 0.5], [-7, 7]);
  const cardBX = useTransform(springX, [-0.5, 0.5], [-18, 18]);
  const cardBY = useTransform(springY, [-0.5, 0.5], [-12, 12]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - r.left) / r.width - 0.5);
    mouseY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  /* cumulative word delays */
  const delays = words.reduce<number[]>((acc, _w, i) => {
    acc.push(i === 0 ? 0.35 : acc[i - 1] + words[i - 1].length * 0.028 + 0.04);
    return acc;
  }, []);

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen bg-page flex flex-col overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Animated gradient blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Blob left="78%" top="18%" size={680} color="rgba(232,227,216,0.58)"
          dx={[0, 28, -16, 0]} dy={[0, -22, 14, 0]} delay={0} />
        <Blob left="14%" top="72%" size={480} color="rgba(245,241,235,0.50)"
          dx={[0, -20, 18, 0]} dy={[0, 16, -12, 0]} delay={4} />
        <Blob left="88%" top="78%" size={380} color="rgba(240,237,230,0.40)"
          dx={[0, -14, 22, 0]} dy={[0, 10, -18, 0]} delay={8} />
        <Blob left="40%" top="30%" size={320} color="rgba(232,227,216,0.25)"
          dx={[0, 16, -10, 0]} dy={[0, -8, 12, 0]} delay={2} />
      </div>

      {/* Background typemark */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center pointer-events-none select-none"
        style={{ y: bgTextY, scale: bgTextScale }}
      >
        <span
          className="font-black text-ink whitespace-nowrap"
          style={{ fontSize: 'clamp(12rem, 26vw, 30rem)', opacity: 0.03, lineHeight: 1, letterSpacing: '-0.055em' }}
        >
          DESIGN
        </span>
      </motion.div>

      {/* Main content */}
      <div className="relative z-10 flex-1 max-w-[1400px] mx-auto w-full px-6 md:px-10 pt-36 pb-16 flex flex-col justify-between">
        <motion.div style={{ y: mainY, opacity: mainOpacity }}>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            className="text-[11px] font-medium tracking-[0.22em] uppercase text-muted mb-10"
          >
            Available for design work · Instructor · Mentor
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_230px] gap-6 lg:gap-10 items-start">

            {/* Heading — char-by-char */}
            <h1
              className="leading-[0.91] tracking-[-0.032em] font-black"
              style={{ fontSize: 'clamp(3rem, 8.2vw, 9rem)' }}
            >
              {words.map((word, i) => (
                <AnimatedWord
                  key={i}
                  word={word}
                  delay={delays[i]}
                  isGrowth={word === 'growth.'}
                />
              ))}
            </h1>

            {/* Floating cards — desktop only */}
            <div className="hidden lg:flex flex-col gap-4 pt-2">
              <motion.div
                style={{ x: cardAX, y: cardAY }}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.1, duration: 0.75, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                >
                  <StatusCard />
                </motion.div>
              </motion.div>

              <motion.div
                style={{ x: cardBX, y: cardBY }}
                initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ delay: 1.3, duration: 0.75, ease: EASE }}
              >
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
                >
                  <StatsCard />
                </motion.div>
              </motion.div>
            </div>
          </div>

          {/* Bottom descriptor row */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.05, duration: 0.72, ease: EASE }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16"
          >
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-muted mb-3">
                UI Design
              </p>
              <p className="text-[15px] leading-relaxed text-ink/65">
                From discovery and lo-fi to pixel-tight designs — bringing your product vision to life.
              </p>
            </div>
            <div>
              <p className="text-[12px] font-semibold tracking-[0.16em] uppercase text-muted mb-3">
                Built to scale
              </p>
              <p className="text-[15px] leading-relaxed text-ink/65">
                Consistent decisions. Reusable patterns. Reduce decision fatigue and respect engineering.
              </p>
            </div>
            <div className="flex flex-col md:items-end md:justify-end gap-3">
              <MagneticButton>
                <button
                  onClick={onScrollToWork}
                  className="group flex items-center gap-3 bg-ink text-page text-[12px] font-semibold tracking-[0.15em] uppercase px-7 py-4 rounded-full hover:opacity-80 transition-opacity"
                >
                  View Selected Work
                  <motion.span
                    className="inline-block"
                    animate={{ x: [0, 3, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  >
                    →
                  </motion.span>
                </button>
              </MagneticButton>
              <MagneticButton>
                <a
                  href="/john-kalu-resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 text-[12px] font-semibold tracking-[0.15em] uppercase text-ink border border-ink/40 px-7 py-4 rounded-full hover:bg-ink hover:text-page hover:border-ink transition-all duration-300"
                >
                  View Resume
                  <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
                </a>
              </MagneticButton>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom rule */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 1.4, duration: 1.1, ease: EASE }}
        style={{ transformOrigin: 'left' }}
        className="relative z-10 h-px bg-ink/10 mx-6 md:mx-10"
      />
    </section>
  );
}
