import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import heritageImg from '../assets/ChatGPT Image Mar 11, 2026, 04_16_51 PM.png';

const HeritageSection: React.FC = () => {
  const { t } = useTranslation();

  const features = [
    {
      icon: <ShieldCheck className="text-[#D4AF37]" />,
      title: t('heritage.features.quality.title'),
      desc: t('heritage.features.quality.desc')
    },
    {
      icon: <Globe className="text-[#D4AF37]" />,
      title: t('heritage.features.global.title'),
      desc: t('heritage.features.global.desc')
    },
    {
      icon: <Zap className="text-[#D4AF37]" />,
      title: t('heritage.features.speed.title'),
      desc: t('heritage.features.speed.desc')
    }
  ];

  return (
    <section className="py-24 bg-[#0a2a22] text-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
              {t('heritage.title_part1')} <br />
              <span className="text-[#D4AF37]">{t('heritage.title_part2')}</span> <br />
              {t('heritage.title_part3')} <span className="text-white">{t('heritage.title_part4')}</span>
            </h2>
            <p className="text-gray-400 text-lg mb-12 leading-relaxed">
              {t('heritage.description')}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {features.map((feature, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <div className="mb-4 bg-white/5 w-12 h-12 rounded-xl flex items-center justify-center border border-white/10">
                    {feature.icon}
                  </div>
                  <h4 className="font-bold text-lg mb-2 text-white">{feature.title}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative"
          >
            <div className="relative z-10 rounded-[4rem] overflow-hidden aspect-square border-[12px] border-white/5 shadow-2xl">
              <img 
                src={heritageImg}
                alt="AYNAWAJ Shoes"
                className="w-full h-full object-cover"
              />
            </div>
            
            {/* Background elements */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeritageSection;