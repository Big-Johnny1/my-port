import { useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

export function useTilt(maxDeg = 9) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateY = useSpring(
    useTransform(rawX, [-0.5, 0.5], [-maxDeg, maxDeg]),
    { stiffness: 420, damping: 46, mass: 0.5 }
  );
  const rotateX = useSpring(
    useTransform(rawY, [-0.5, 0.5], [maxDeg, -maxDeg]),
    { stiffness: 420, damping: 46, mass: 0.5 }
  );

  const glossX = useTransform(rawX, [-0.5, 0.5], [10, 90]);
  const glossY = useTransform(rawY, [-0.5, 0.5], [10, 90]);
  const glossBg = useMotionTemplate`radial-gradient(
    circle at ${glossX}% ${glossY}%,
    rgba(255,255,255,0.18) 0%,
    rgba(255,255,255,0.06) 30%,
    transparent 65%
  )`;

  const boxShadow = useTransform(
    [rotateX, rotateY],
    ([rx, ry]: number[]) => {
      const sx = ry * 2.2;
      const sy = -rx * 2.2;
      const blur = 50 + (Math.abs(rx) + Math.abs(ry)) * 3;
      return `${sx}px ${sy}px ${blur}px -8px rgba(0,0,0,0.32), 0 8px 22px rgba(0,0,0,0.1)`;
    }
  );

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width - 0.5);
    rawY.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function onMouseLeave() {
    rawX.set(0);
    rawY.set(0);
  }

  return { rotateX, rotateY, glossBg, boxShadow, onMouseMove, onMouseLeave };
}
