import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { cn } from '../lib/utils';

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'am', name: 'አማርኛ', flag: '🇪🇹' }
  ];

  const currentLanguage = languages.find(lang => lang.code === i18n.language) || languages[0];

  const toggleLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/20 bg-white/5 hover:bg-primary/10 transition-colors text-xs font-bold uppercase tracking-widest text-foreground/80 hover:text-primary"
      >
        <Globe size={14} className="text-primary" />
        <span>{currentLanguage.code.toUpperCase()}</span>
        <ChevronDown size={12} className={cn("transition-transform duration-300", isOpen ? "rotate-180" : "rotate-0")} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)} 
            />
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-40 rounded-2xl bg-[#01261C] border border-primary/20 shadow-2xl z-50 overflow-hidden"
            >
              <div className="p-2 space-y-1">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => toggleLanguage(lang.code)}
                    className={cn(
                      "w-full flex items-center justify-between px-4 py-2.5 rounded-xl text-sm transition-all",
                      i18n.language === lang.code 
                        ? "bg-primary text-[#01261C] font-bold" 
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <span>{lang.name}</span>
                    <span className="text-lg">{lang.flag}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSelector;