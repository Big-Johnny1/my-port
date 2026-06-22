import { useEffect } from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';

export default function SpotlightCursor() {
  const x = useMotionValue(-1000);
  const y = useMotionValue(-1000);

  const sx = useSpring(x, { damping: 22, stiffness: 170, mass: 0.4 });
  const sy = useSpring(y, { damping: 22, stiffness: 170, mass: 0.4 });

  // Outer illumination — large soft glow
  const outerGlow = useMotionTemplate`radial-gradient(
    700px circle at ${sx}px ${sy}px,
    rgba(255, 255, 255, 0.07) 0%,
    rgba(255, 255, 255, 0.03) 40%,
    transparent 70%
  )`;

  // Inner ring — tighter bright core
  const innerGlow = useMotionTemplate`radial-gradient(
    120px circle at ${sx}px ${sy}px,
    rgba(255, 255, 255, 0.22) 0%,
    transparent 100%
  )`;

  useEffect(() => {
    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, [x, y]);

  return (
    <>
      {/* Outer glow layer — mix-blend-overlay illuminates colored areas */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[22] mix-blend-overlay"
        style={{ background: outerGlow }}
        aria-hidden="true"
      />
      {/* Inner bright core */}
      <motion.div
        className="pointer-events-none fixed inset-0 z-[23] mix-blend-overlay"
        style={{ background: innerGlow }}
        aria-hidden="true"
      />
    </>
  );
}
