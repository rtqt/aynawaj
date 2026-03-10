import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Menu, X, Search } from 'lucide-react';
import { cn } from '../lib/utils';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import LanguageSelector from './LanguageSelector';
import { useCart } from '../hooks/useCart';

const LOGO_URL = "https://storage.googleapis.com/dala-prod-public-storage/attachments/a33a3253-224b-46e3-8cf8-f3927c66f828/1772967550667_20251016_161737.jpg";

const Navbar: React.FC = () => {
  const { t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const { scrollY } = useScroll();

  const headerBg = useTransform(
    scrollY,
    [0, 100],
    ["rgba(1, 38, 28, 0)", "rgba(1, 38, 28, 0.95)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: t('nav.home'), href: '/' },
    { name: t('nav.men'), href: '/men' },
    { name: t('nav.women'), href: '/women' },
    { name: t('nav.collections'), href: '/collections' },
    { name: t('nav.about'), href: '/about' },
  ];

  return (
    <motion.nav
      style={{ backgroundColor: headerBg }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-md",
        scrolled ? "py-3 shadow-xl border-b border-primary/20" : "py-6"
      )}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <Link to="/">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                opacity: { delay: 3.1, duration: 0.2, ease: "linear" },
              }}
              className="w-10 h-10 rounded-full border border-primary overflow-hidden group-hover:scale-110 transition-transform block"
            >
              <img src={LOGO_URL} alt="Logo" className="w-full h-full object-cover" />
            </motion.div>
          </Link>
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col"
          >
            <span className="font-black text-xl tracking-wider text-primary leading-none uppercase">
              {t('brand.name')}
            </span>
            <span className="text-[10px] tracking-[0.3em] text-foreground/60 leading-none mt-1 uppercase">
              {t('brand.tagline')}
            </span>
          </motion.div>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-10">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              className="text-xs font-bold uppercase tracking-[0.2em] text-foreground/80 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full" />
            </Link>
          ))}
        </div>

        {/* Action Icons */}
        <div className="flex items-center space-x-5">
          <div className="hidden sm:block">
            <LanguageSelector />
          </div>
          <button className="p-2 text-foreground/80 hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button
            className="p-2 text-foreground/80 hover:text-primary transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[9px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                {totalItems}
              </span>
            )}
          </button>
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-primary/20 overflow-hidden"
          >
            <div className="flex flex-col p-8 space-y-6">
              <div className="flex justify-center mb-4">
                <LanguageSelector />
              </div>
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-xl font-black uppercase tracking-widest text-foreground hover:text-primary transition-colors text-center"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;