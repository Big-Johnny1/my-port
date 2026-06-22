import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Testimonial() {
  const ref = useRef<HTMLElement>(null);
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  useEffect(() => {
    if (!quoteRef.current) return;
    // Split quote into words for staggered reveal
    const text = quoteRef.current.textContent ?? '';
    const wordsArr = text.split(' ');
    quoteRef.current.innerHTML = wordsArr
      .map((w) => `<span class="inline-block overflow-hidden"><span class="inline-block gsap-word">${w}</span></span>`)
      .join(' ');

    const wordEls = quoteRef.current.querySelectorAll('.gsap-word');
    const ctx = gsap.context(() => {
      gsap.from(wordEls, {
        y: '110%',
        opacity: 0,
        stagger: 0.018,
        duration: 0.75,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: quoteRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} className="bg-off-white">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl"
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-muted mb-10">
            Recommendation
          </span>
          <blockquote
            ref={quoteRef}
            className="font-semibold leading-[1.4] tracking-[-0.02em] text-ink"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 2.2rem)' }}
          >
            "John brings clarity to messy product problems. He thinks in systems, ships fast and actually listens to engineering constraints — the result is design that survives contact with production."
          </blockquote>
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-8 flex items-center gap-4"
          >
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center text-[11px] font-bold"
              style={{ background: 'var(--color-ink)', color: 'var(--color-page)' }}
            >
              CT
            </div>
            <div>
              <p className="text-[13px] font-semibold text-ink">Codar Tech Academy</p>
              <p className="text-[12px] text-muted">Design Lead — Cohort 3</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
