import React, { useState } from 'react';
import { Instagram, Twitter, Facebook, ArrowUpRight, Send, MoveRight } from 'lucide-react';
import { toast } from 'sonner';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

// Logo for footer
const LOGO_URL = "/photo_2025-12-13_13-08-19.jpg";

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#01261C] pt-24 pb-12 border-t border-white/5">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full border border-[#D4AF37] overflow-hidden">
                <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-xl tracking-wider text-[#D4AF37] leading-none uppercase">
                  {t('brand.name')}
                </span>
                <span className="text-[10px] tracking-[0.3em] text-white/60 leading-none mt-1 uppercase">
                  {t('brand.tagline')}
                </span>
              </div>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              {t('footer.brand_desc')}
            </p>
            <div className="flex gap-4">
              {[
                {
                  icon: <Instagram size={18} />,
                  href: "https://www.instagram.com/aynawaj_/"
                },
                {
                  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" /></svg>,
                  href: "https://www.tiktok.com/@aynawaj"
                },
                {
                  icon: <Send size={18} strokeWidth={2.5} className="mr-0.5" />,
                  href: "https://t.me/aynawajshoes"
                }
              ].map((social, idx) => (
                <a key={idx} href={social.href} target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#01261C] transition-all text-white">
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">{t('footer.col_collection')}</h4>
            <ul className="space-y-4">
              {[
                { name: 'Elite Series', path: '/collections' },
                { name: 'Velocity', path: '/collections' },
                { name: 'Heritage', path: '/collections' },
                { name: 'Infinity', path: '/collections' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">{t('footer.col_services')}</h4>
            <ul className="space-y-4">
              {[
                { name: 'Order Status', path: '/about' },
                { name: 'Returns', path: '/about' },
                { name: 'Size Chart', path: '/about' },
                { name: 'Contact Support', path: '/about' }
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="text-gray-400 hover:text-[#D4AF37] transition-colors">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-6 text-white">{t('footer.col_join')}</h4>
            <p className="text-gray-400 text-sm mb-6">{t('footer.join_desc')}</p>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                toast.success(t('footer.toast_welcome'));
              }}
              className="flex gap-2"
            >
              <input
                type="email"
                placeholder={t('footer.email_placeholder')}
                className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 flex-1 focus:outline-none focus:ring-2 focus:ring-[#D4AF37]"
                required
              />
              <button className="bg-[#D4AF37] text-[#01261C] p-2 rounded-lg hover:bg-white transition-colors">
                <ArrowUpRight size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            {t('footer.rights', { year: currentYear })}
          </p>
          <div className="flex gap-8">
            <Link to="/about" className="text-gray-500 text-sm hover:text-white">{t('footer.privacy')}</Link>
            <Link to="/about" className="text-gray-500 text-sm hover:text-white">{t('footer.terms')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;