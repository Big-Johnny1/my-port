import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

type CursorState = 'default' | 'hover' | 'click' | 'text';

export default function CustomCursor() {
  const [state, setState] = useState<CursorState>('default');
  const [visible, setVisible] = useState(false);
  const stateRef = useRef<CursorState>('default');

  const mx = useMotionValue(-200);
  const my = useMotionValue(-200);

  // Dot follows precisely
  const dotX = useSpring(mx, { stiffness: 900, damping: 50, mass: 0.1 });
  const dotY = useSpring(my, { stiffness: 900, damping: 50, mass: 0.1 });

  // Ring follows with lag
  const ringX = useSpring(mx, { stiffness: 180, damping: 28, mass: 0.6 });
  const ringY = useSpring(my, { stiffness: 180, damping: 28, mass: 0.6 });

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mx.set(e.clientX);
      my.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const enter = () => setVisible(true);
    const leave = () => setVisible(false);

    const down = () => {
      stateRef.current = 'click';
      setState('click');
    };
    const up = () => {
      stateRef.current = 'default';
      setState('default');
    };

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      const isInteractive =
        t.closest('a, button, [role="button"], [data-cursor="hover"]') !== null;
      const isText =
        t.closest('p, h1, h2, h3, h4, span, blockquote') !== null &&
        !isInteractive;

      if (isInteractive) {
        stateRef.current = 'hover';
        setState('hover');
      } else if (isText) {
        stateRef.current = 'text';
        setState('text');
      } else {
        stateRef.current = 'default';
        setState('default');
      }
    };

    window.addEventListener('mousemove', move);
    window.addEventListener('mouseenter', enter);
    window.addEventListener('mouseleave', leave);
    window.addEventListener('mousedown', down);
    window.addEventListener('mouseup', up);
    window.addEventListener('mouseover', onOver);

    return () => {
      window.removeEventListener('mousemove', move);
      window.removeEventListener('mouseenter', enter);
      window.removeEventListener('mouseleave', leave);
      window.removeEventListener('mousedown', down);
      window.removeEventListener('mouseup', up);
      window.removeEventListener('mouseover', onOver);
    };
  }, [mx, my, visible]);

  const isHover = state === 'hover';
  const isClick = state === 'click';

  const ringSize = isHover ? 44 : isClick ? 18 : 36;
  const ringOpacity = visible ? (isHover ? 0.9 : 0.6) : 0;
  const dotSize = isHover ? 6 : isClick ? 10 : 5;
  const dotOpacity = visible ? 1 : 0;

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full border border-ink mix-blend-difference"
        style={{
          x: ringX,
          y: ringY,
          width: ringSize,
          height: ringSize,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: ringSize,
          height: ringSize,
          opacity: ringOpacity,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />

      {/* Inner dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] rounded-full bg-ink mix-blend-difference"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: dotSize,
          height: dotSize,
          opacity: dotOpacity,
        }}
        transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
        aria-hidden="true"
      />
    </>
  );
}
