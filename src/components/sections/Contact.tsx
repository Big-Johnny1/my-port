import { useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import MagneticButton from '../ui/MagneticButton';

gsap.registerPlugin(ScrollTrigger);

const contactItems = [
  { icon: Mail, label: 'Gmail', value: 'mrkalujohn@gmail.com', href: 'mailto:mrkalujohn@gmail.com' },
  { icon: MessageCircle, label: 'WhatsApp', value: 'Message me directly', href: 'https://wa.me/2347081892954' },
  { icon: ExternalLink, label: 'LinkedIn', value: 'Coming soon', href: null as null },
];

const footerLinks = [
  { label: 'Work', section: 'work' },
  { label: 'About', section: 'about' },
  { label: 'Journey', section: 'journey' },
];

export default function Contact() {
  const ref = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });

  useEffect(() => {
    if (!headingRef.current) return;
    const lines = headingRef.current.querySelectorAll('[data-line]');
    const ctx = gsap.context(() => {
      gsap.from(lines, {
        y: '105%',
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: headingRef.current,
          start: 'top 88%',
          once: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="bg-[#0d0d0d] dark:bg-[#110f0d]">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 pt-24 md:pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block text-[11px] font-semibold tracking-[0.2em] uppercase text-white/40 mb-10">
            Available for projects
          </span>
          <h2
            ref={headingRef}
            className="font-black leading-[0.95] tracking-[-0.04em] text-white overflow-hidden"
            style={{ fontSize: 'clamp(3rem, 9vw, 9.5rem)' }}
          >
            <span className="block overflow-hidden"><span data-line className="block">Let's build</span></span>
            <span className="block overflow-hidden"><span data-line className="block">something</span></span>
            <span className="block overflow-hidden"><span data-line className="block">that ships.</span></span>
          </h2>
          <p className="mt-8 text-[16px] text-white/50 max-w-md leading-relaxed">
            Based in Lagos. Open to remote roles globally. I usually respond within 24 hours.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-white/10 pt-10"
        >
          {contactItems.map((item) => (
            <a
              key={item.label}
              href={item.href ?? undefined}
              target={item.href?.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className={`group flex flex-col gap-3 transition-opacity duration-300 ${item.href ? 'hover:opacity-70' : 'opacity-40 cursor-default pointer-events-none'}`}
            >
              <item.icon size={16} className="text-white/40 transition-transform duration-300 group-hover:translate-x-1" />
              <div>
                <p className="text-[11px] font-semibold tracking-[0.18em] uppercase text-white/30 mb-1">
                  {item.label}
                </p>
                <p className="text-[15px] font-medium text-white">{item.value}</p>
              </div>
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16"
        >
          <div className="flex flex-wrap items-center gap-4">
            <MagneticButton>
              <a
                href="mailto:mrkalujohn@gmail.com"
                className="inline-flex items-center gap-3 bg-white text-[#0d0d0d] text-[12px] font-bold tracking-[0.15em] uppercase px-8 py-4 rounded-full hover:bg-white/90 transition-colors"
              >
                Send Message →
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="https://drive.google.com/file/d/1rE7jmQGH050_yCq82boCLXyf20FEwD9O/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.15em] uppercase text-white border border-white/50 px-8 py-4 rounded-full hover:bg-white hover:text-[#0d0d0d] transition-all duration-300"
              >
                View Resume
                <span className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300">↗</span>
              </a>
            </MagneticButton>
          </div>
        </motion.div>

        <div className="mt-24 pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-sm bg-white" />
            <span className="text-[11px] font-semibold tracking-[0.15em] uppercase text-white">
              John Kalu
            </span>
          </div>
          <nav className="flex items-center gap-6">
            {footerLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.section}`}
                className="text-[11px] font-medium tracking-[0.12em] uppercase text-white/35 hover:text-white transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <p className="text-[11px] text-white/30">
            © {new Date().getFullYear()} John Kalu. All rights reserved.
          </p>
        </div>
      </div>
    </section>
  );
}
