import { motion, useScroll, useSpring } from 'framer-motion';

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30, mass: 0.5 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-ink z-[9998] origin-left"
      style={{ scaleX }}
      aria-hidden="true"
    />
  );
}
