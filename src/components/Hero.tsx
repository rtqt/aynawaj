import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-[calc(100vh-80px)] pt-24 pb-12 md:pb-16 flex items-center overflow-hidden bg-[#01261C]">
      {/* Background Elements */}
      <div className="absolute top-20 right-[-10%] w-[500px] h-[500px] bg-[#D4AF37]/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-10 left-[-5%] w-[300px] h-[300px] bg-[#D4AF37]/5 rounded-full blur-3xl -z-10" />

      <div className="container mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/10 text-[#D4AF37] text-xs font-bold uppercase tracking-widest mb-4 border border-[#D4AF37]/20">
            <Star size={12} fill="currentColor" />
            <span>{t('hero.badge')}</span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[0.95] mb-5 text-white tracking-tight">
            {t('hero.title_part1')} <br />
            <span className="text-[#D4AF37]">{t('hero.title_part2')}</span>
          </h1>

          <p className="text-base md:text-lg text-gray-300 mb-8 max-w-lg leading-relaxed">
            {t('hero.description')}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-8">
            <button
              onClick={() => toast.success(t('hero.toast_exploring'))}
              className="px-8 py-4 bg-[#D4AF37] text-[#01261C] rounded-xl font-black shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:bg-white hover:text-[#01261C] hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-3 uppercase tracking-widest"
            >
              {t('hero.shop_now')} <ArrowRight size={20} />
            </button>
            <button className="px-8 py-4 bg-white/10 border-2 border-white/30 text-white rounded-xl font-black hover:border-white hover:bg-white hover:text-[#01261C] hover:scale-[1.02] transition-all duration-300 uppercase tracking-widest flex items-center justify-center">
              {t('hero.our_vision')}
            </button>
          </div>

          <div className="mt-10 flex items-center gap-6 md:gap-8">
            <div>
              <p className="text-3xl font-black text-white">100%</p>
              <p className="text-sm text-gray-400 font-medium">{t('hero.original_design')}</p>
            </div>
            <div className="w-px h-10 bg-gray-700" />
            <div>
              <p className="text-3xl font-black text-[#D4AF37]">Premium</p>
              <p className="text-sm text-gray-400 font-medium">{t('hero.premium_materials')}</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: 5 }}
          animate={{ scale: 1, opacity: 1, rotate: -5 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="relative"
        >
          <div className="relative z-10 w-[80%] max-w-[350px] md:max-w-[400px] lg:max-w-[450px] mx-auto aspect-square rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)] rotate-3 transform group hover:rotate-0 transition-transform duration-700 border-8 border-white/5">
            <img
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/f6d0def7-fb25-42be-bef2-a9d57a534885/hero-sneaker-1-7eee2714-1772967337628.webp"
              alt="Premium AYNAWAJ Kick"
              className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>

          <motion.div
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-6 -right-6 bg-[#D4AF37] text-[#01261C] p-4 rounded-2xl shadow-xl z-20 flex flex-col items-center"
          >
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-[#01261C] mb-2">
              <span className="font-bold text-xs">J</span>
            </div>
            <span className="text-[10px] font-bold uppercase">{t('hero.infinity')}</span>
          </motion.div>

          <motion.div
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute -bottom-8 -left-8 bg-white text-[#01261C] p-6 rounded-2xl shadow-xl z-20"
          >
            <p className="text-sm font-bold opacity-70">{t('hero.limitless')}</p>
            <p className="text-2xl font-black text-[#01261C]">{t('hero.elite')}</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;