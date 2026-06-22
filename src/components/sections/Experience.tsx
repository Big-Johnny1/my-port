import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { experience, stats } from '../../data';
import CountUp from '../ui/CountUp';

gsap.registerPlugin(ScrollTrigger);

export default function Experience() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const rowsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rowsRef.current) return;
    const rows = rowsRef.current.querySelectorAll('[data-row]');
    const ctx = gsap.context(() => {
      gsap.from(rows, {
        opacity: 0,
        x: -22,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: rowsRef.current,
          start: 'top 85%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="journey" className="bg-page">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-36">
        <motion.span
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-16"
        >
          Where I've Shipped
        </motion.span>

        <div ref={rowsRef} className="space-y-0">
          {experience.map((exp, i) => (
            <div
              key={i}
              data-row
              className="flex flex-col gap-1 md:grid md:grid-cols-[200px_1fr_auto] md:gap-8 md:items-baseline py-6 border-b border-ink/8 group"
            >
              <span className="text-[12px] font-medium text-muted tabular-nums order-2 md:order-1 transition-colors duration-300 group-hover:text-ink/60">
                {exp.period}
              </span>
              <span
                className="font-semibold text-ink order-1 md:order-2 transition-all duration-300 group-hover:translate-x-1"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 2.8rem)', display: 'inline-block' }}
              >
                {exp.company}
              </span>
              <span className="text-[11px] font-medium text-muted order-3 md:text-right md:whitespace-nowrap transition-colors duration-300 group-hover:text-ink/60">
                {exp.role}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="border-t-2 border-ink pt-6"
            >
              <div
                className="font-black tracking-[-0.04em] text-ink leading-none"
                style={{ fontSize: 'clamp(2.8rem, 5vw, 4rem)' }}
              >
                <CountUp end={stat.value} suffix={stat.suffix} />
              </div>
              <p className="mt-3 text-[13px] leading-relaxed text-muted max-w-[200px]">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
