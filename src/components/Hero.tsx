import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Sparkles, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-24 pb-12 flex items-center overflow-hidden bg-[#01261C]">
      {/* Animated Dynamic Background Elements */}
      <div className="absolute inset-0 z-0 opacity-20 pointer-events-none bg-[radial-gradient(circle_at_50%_50%,_rgba(212,175,55,0.1),_transparent_70%)]" />

      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 150, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-gradient-to-br from-[#D4AF37]/20 via-[#01261C]/0 to-transparent rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
        className="absolute bottom-[-10%] left-[-20%] w-[600px] h-[600px] bg-gradient-to-tr from-[#D4AF37]/10 via-[#D4AF37]/5 to-transparent rounded-full blur-3xl -z-10"
      />

      <div className="container relative z-10 mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: 'easeOut' }}
          className="lg:col-span-6 xl:col-span-5 flex flex-col justify-center"
        >
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-black uppercase tracking-[0.2em] mb-8 border border-[#D4AF37]/30 backdrop-blur-md shadow-[0_0_20px_rgba(212,175,55,0.15)] w-fit"
          >
            <Sparkles size={14} className="animate-pulse" />
            <span>{t('hero.badge')}</span>
          </motion.div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[5rem] font-black leading-[0.9] mb-6 text-white tracking-tighter">
            {t('hero.title_part1')} <br />
            <span className="relative inline-block mt-2">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-[#D4AF37] via-[#efdca5] to-[#D4AF37] drop-shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                {t('hero.title_part2')}
              </span>
              {/* Text underline glow */}
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.8, duration: 1, ease: "easeInOut" }}
                className="absolute -bottom-2 left-0 w-full h-2 bg-[#D4AF37]/30 blur-md origin-left rounded-full"
              />
            </span>
          </h1>

          <p className="text-base sm:text-lg text-gray-300/90 mb-10 max-w-lg leading-relaxed font-medium">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-5">
            <button
              onClick={() => {
                const target = document.getElementById('product-grid');
                if (target) {
                  target.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group relative px-10 py-5 bg-[#D4AF37] text-[#01261C] rounded-2xl font-black shadow-[0_0_40px_rgba(212,175,55,0.4)] hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] hover:bg-white overflow-hidden transition-all duration-300 w-full sm:w-auto"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 uppercase tracking-widest">
                {t('hero.shop_now')}
                <MoveRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
              {/* Hover highlight sweep */}
              <div className="absolute inset-0 bg-white/40 translate-x-[-100%] skew-x-[-15deg] group-hover:animate-[shimmer_1.5s_infinite] transition-all" />
            </button>

            <button className="px-10 py-5 bg-white/5 border border-white/20 text-white rounded-2xl font-bold backdrop-blur-md hover:bg-white/10 hover:border-white/40 transition-all duration-300 uppercase tracking-widest w-full sm:w-auto hover:-translate-y-1">
              {t('hero.our_vision')}
            </button>
          </div>

          {/* Stats/Proof Below Buttons */}
          <div className="mt-14 flex items-center gap-8 md:gap-12">
            <div className="flex flex-col">
              <span className="text-4xl font-black text-white">100%</span>
              <span className="text-xs text-[#D4AF37] font-bold uppercase tracking-widest mt-1">{t('hero.original_design')}</span>
            </div>
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent" />
            <div className="flex flex-col">
              <span className="text-4xl font-black text-[#D4AF37]">Premium</span>
              <span className="text-xs text-white/50 font-bold uppercase tracking-widest mt-1">{t('hero.premium_materials')}</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Showcase Section */}
        <div className="lg:col-span-6 xl:col-span-7 relative h-[500px] md:h-[600px] lg:h-[700px] w-full flex justify-center lg:justify-end items-center mt-12 lg:mt-0">

          {/* Artistic Rings */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute w-[80%] aspect-square rounded-full border border-dashed border-[#D4AF37]/20"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 0.2 }}
            className="absolute w-[60%] aspect-square rounded-full border border-[#D4AF37]/10 bg-[#D4AF37]/[0.02] backdrop-blur-3xl"
          />

          {/* Main Image Container */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20, delay: 0.3 }}
            className="relative z-20 w-[90%] sm:w-[70%] max-w-[500px] aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] group"
          >
            <div className="absolute inset-0 bg-gradient-to-t from-[#01261C] via-transparent to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
            <img
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6d0def7-fb25-42be-bef2-a9d57a534885/hero-sneaker-1-7eee2714-1772967337628.webp"
              alt="Premium AYNAWAJ Kick"
              className="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-[1.5s] ease-out"
            />

            {/* Overlay text on image */}
            <div className="absolute bottom-6 left-8 z-20">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="text-white/80 text-sm font-bold uppercase tracking-widest mb-1"
              >
                Signature Collection
              </motion.p>
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="text-2xl font-black text-white"
              >
                THE A-SERIES
              </motion.p>
            </div>
          </motion.div>

          {/* Floating Glass Panels */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0, y: [0, -15, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 0.8 },
              x: { duration: 0.8, delay: 0.8 },
              y: { duration: 5, repeat: Infinity, ease: "easeInOut" }
            }}
            className="absolute top-[15%] right-0 md:right-[-5%] bg-white/10 backdrop-blur-xl border border-white/20 text-white p-5 rounded-2xl shadow-2xl z-30 flex items-center gap-4 hidden sm:flex"
          >
            <div className="w-12 h-12 bg-gradient-to-br from-[#D4AF37] to-[#8a7224] rounded-full flex items-center justify-center text-[#01261C] shadow-[0_0_15px_rgba(212,175,55,0.5)]">
              <Star size={20} fill="currentColor" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-gray-300 uppercase tracking-widest mb-0.5">{t('hero.infinity')}</p>
              <p className="text-lg font-black text-[#D4AF37]">Top Rated</p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0, y: [0, 20, 0] }}
            transition={{
              opacity: { duration: 0.8, delay: 1 },
              x: { duration: 0.8, delay: 1 },
              y: { duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }
            }}
            className="absolute bottom-[20%] left-[-5%] md:left-[5%] bg-gradient-to-br from-[#01261C]/80 to-[#01261C]/40 backdrop-blur-xl border border-[#D4AF37]/30 p-6 rounded-3xl shadow-2xl z-30 hidden sm:block"
          >
            <p className="text-xs font-bold text-white/50 uppercase tracking-widest mb-1">{t('hero.limitless')}</p>
            <p className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-[#D4AF37]">{t('hero.elite')}</p>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Hero;