import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PageLoader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setDone(true), 1200);
    return () => clearTimeout(id);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[10000] bg-page flex items-end px-6 md:px-10 pb-10 pointer-events-none"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          {/* Loading bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] bg-ink"
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
