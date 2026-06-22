import { useEffect, useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { skills } from '../../data';
import { EASE } from '../../utils/motion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!skillsRef.current) return;
    const items = skillsRef.current.querySelectorAll('span');
    const ctx = gsap.context(() => {
      gsap.from(items, {
        opacity: 0,
        y: 14,
        filter: 'blur(4px)',
        stagger: 0.055,
        duration: 0.55,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: skillsRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, filter: 'blur(6px)' },
    show: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.7, ease: EASE } },
  };

  return (
    <section ref={ref} id="about" className="bg-off-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-28 md:py-36">
        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24"
        >
          <div>
            <motion.span
              variants={item}
              className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-10"
            >
              About
            </motion.span>
            <motion.h2
              variants={item}
              className="font-bold leading-[1.05] tracking-[-0.03em] text-ink"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 4rem)' }}
            >
              Designer,
              <br />
              instructor,
              <br />
              mentor.
            </motion.h2>
          </div>

          <div className="flex flex-col justify-end">
            <motion.div variants={item} className="space-y-5 mb-12">
              <p className="text-[16px] leading-[1.75] text-ink/75">
                I'm a product designer based in Lagos, Nigeria. For the last 5+ years I've helped teams turn vague problems into shipped, opinionated software across fintech, logistics, education and SaaS.
              </p>
              <p className="text-[16px] leading-[1.75] text-ink/75">
                Outside client work, I teach and mentor designers at Codar Tech Academy — 75+ members across Africa, from first-portfolio rookies to senior practitioners sharpening their craft.
              </p>
              <p className="text-[16px] leading-[1.75] text-ink/75">
                My bias: ship the smallest thing that proves the idea, then earn the right to add more.
              </p>
            </motion.div>

            <motion.div variants={item} className="pt-8 border-t border-ink/8">
              <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-6">
                Tools & Skills
              </p>
              <div ref={skillsRef} className="grid grid-cols-3 gap-y-3 gap-x-4">
                {skills.map((skill) => (
                  <span key={skill} className="text-[13px] font-medium text-ink/65">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
