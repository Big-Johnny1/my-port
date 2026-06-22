export const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const EASE_OUT: [number, number, number, number] = [0.0, 0.0, 0.2, 1.0];
export const EASE_IN_OUT: [number, number, number, number] = [0.45, 0, 0.55, 1];

export const SPRING_SOFT = { stiffness: 120, damping: 20, mass: 0.8 };
export const SPRING_SNAPPY = { stiffness: 400, damping: 40, mass: 0.5 };
export const SPRING_MAGNETIC = { stiffness: 200, damping: 18 };

export const fadeUp = {
  hidden: { opacity: 0, y: 32, filter: 'blur(6px)' },
  show: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

export const staggerContainer = (stagger = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: stagger, delayChildren: delay } },
});
