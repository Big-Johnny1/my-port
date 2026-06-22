import { motion } from 'framer-motion';

const companies = ['Datamellon', 'Viscio Logistics', 'Zeph Agency', 'Suno Studio', 'Eco Academy', 'Silicash'];
const repeated = [...companies, ...companies, ...companies, ...companies];

export default function Marquee() {
  return (
    <div className="overflow-hidden border-y border-ink/8 py-6 bg-page">
      <div className="flex">
        <motion.div
          animate={{ x: '-50%' }}
          transition={{ duration: 22, repeat: Infinity, ease: 'linear' }}
          className="flex shrink-0 items-center gap-0"
        >
          {repeated.map((company, i) => (
            <span key={i} className="flex items-center shrink-0">
              <span
                className="font-bold text-ink/40 whitespace-nowrap"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                {company}
              </span>
              <span
                className="mx-6 font-light text-ink/25"
                style={{ fontSize: 'clamp(1.8rem, 4vw, 3.5rem)' }}
              >
                +
              </span>
            </span>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
