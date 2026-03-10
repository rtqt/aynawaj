import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Navbar from './Navbar';
import Footer from './Footer';
import Preloader from './Preloader';
import CartSidebar from './CartSidebar';
import { Toaster } from 'sonner';

const Layout: React.FC = () => {
    const [preloaderVisible, setPreloaderVisible] = useState(true);
    const [contentVisible, setContentVisible] = useState(false);

    useEffect(() => {
        // Show content underneath instantly or slightly delayed
        const showContent = setTimeout(() => {
            setContentVisible(true);
        }, 100);

        // Keep preloader mounted until fully finished animating its own exit
        const hidePreloader = setTimeout(() => {
            setPreloaderVisible(false);
        }, 3200);

        return () => {
            clearTimeout(showContent);
            clearTimeout(hidePreloader);
        };
    }, []);

    return (
        <div className="min-h-screen bg-[#01261C] text-white selection:bg-[#D4AF37] selection:text-[#01261C]">
            {/* Dynamic Theme Injection */}
            <style>{`
        :root {
          --background: #01261C;
          --foreground: #ffffff;
          --primary: #D4AF37;
          --primary-foreground: #01261C;
          --border: rgba(212, 175, 55, 0.2);
        }
        body {
          background-color: #01261C;
          color: white;
          overflow-x: hidden;
        }
        ::selection {
          background: #D4AF37;
          color: #01261C;
        }
      `}</style>

            <Toaster position="top-center" richColors theme="dark" />
            <CartSidebar />

            {contentVisible && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 2.2, ease: 'easeInOut' }}
                    className="flex flex-col min-h-screen"
                >
                    <Navbar />
                    <div className="flex-grow">
                        <Outlet />
                    </div>
                    <Footer />
                </motion.div>
            )}

            {/* Preloader sits on top and shrinks its own logo down into place */}
            <AnimatePresence>
                {preloaderVisible && <Preloader key="preloader" />}
            </AnimatePresence>
        </div>
    );
};

export default Layout;
