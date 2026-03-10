import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/a33a3253-224b-46e3-8cf8-f3927c66f828/1772967550667_20251016_161737.jpg";

const Preloader: React.FC = () => {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<'loading' | 'morphing' | 'done'>('loading');

  useEffect(() => {
    // Start morph phase after 2.2s
    const morphTimer = setTimeout(() => {
      setPhase('morphing');
    }, 2200);

    return () => clearTimeout(morphTimer);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[100] pointer-events-none"
      initial={{ backgroundColor: 'rgba(1, 38, 28, 1)' }}
      animate={{ backgroundColor: phase === 'loading' ? 'rgba(1, 38, 28, 1)' : 'rgba(1, 38, 28, 0)' }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Background that fades out to reveal content underneath */}
      <AnimatePresence>
        {phase === 'loading' && (
          <motion.div
            className="absolute inset-0 bg-[#01261C] flex flex-col items-center justify-center pointer-events-auto"
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            {/* Brand text & progress bar container */}
            <motion.div
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="absolute top-[60%] flex flex-col items-center"
            >
              <h1 className="text-3xl md:text-5xl font-black tracking-[0.25em] text-primary uppercase mt-10">
                {t('brand.name')}
              </h1>
              <p className="text-xs md:text-sm tracking-[0.5em] text-white/60 uppercase mt-3">
                {t('brand.tagline')}
              </p>

              <div className="mt-12 h-[2px] w-32 bg-primary/15 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-primary/60 via-primary to-primary/60"
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ repeat: Infinity, duration: 1.4, ease: 'linear' }}
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* The Logo itself — handles its own position animation */}
      <motion.div
        className="absolute rounded-full border border-primary shadow-[0_0_50px_rgba(212,175,55,0.35)] overflow-hidden"
        initial={{
          top: '50%',
          left: '50%',
          x: '-50%',
          y: '-50%',
          width: '13rem', // 52 x 4 (Tailwind relative)
          height: '13rem',
          borderWidth: '4px',
          opacity: 0,
          scale: 0.5
        }}
        animate={
          phase === 'loading'
            ? {
              top: '40%', // slightly offset center
              left: '50%',
              x: '-50%',
              y: '-50%',
              width: '13rem',
              height: '13rem',
              borderWidth: '4px',
              opacity: 1,
              scale: 1,
              transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] }
            }
            : {
              // Approximate navbar position
              // At window > 768px (md), container mx-auto px-6. Left alignment.
              // Top is ~24px (py-6) or 12px (py-3 scrolled)
              top: window.innerWidth < 768 ? '24px' : '24px',
              left: window.innerWidth < 768 ? '24px' : 'calc((100vw - min(100vw, 1536px)) / 2 + 24px)', // Account for container mx-auto
              x: '0%',
              y: '0%',
              width: '40px', // w-10
              height: '40px', // h-10
              borderWidth: '1px',
              opacity: 1, // Keep visible right until unmount
              scale: 1,
              transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] }
            }
        }
      >
        <img
          src={LOGO_URL}
          alt="AYNAWAJ LOGO"
          className="w-full h-full object-cover"
        />
        {/* Shimmer overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
          initial={{ x: '-100%' }}
          animate={{ x: '200%' }}
          transition={{ duration: 1.4, delay: 0.6, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Preloader;