import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';

// An inline SVG sneaker silhouette
const ShoeSVG: React.FC<{ className?: string; flip?: boolean; style?: React.CSSProperties }> = ({ className, flip, style }) => (
    <svg
        viewBox="0 0 200 100"
        className={className}
        style={{ transform: flip ? 'scaleX(-1)' : undefined, ...style }}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Sole */}
        <ellipse cx="100" cy="88" rx="88" ry="10" fill="currentColor" opacity="0.3" />
        {/* Body */}
        <path
            d="M10 78 Q20 40 60 38 L80 30 Q100 18 130 22 L175 30 Q195 35 190 55 Q188 68 170 72 L30 80 Q18 82 10 78 Z"
            fill="currentColor"
        />
        {/* Toe cap highlight */}
        <path
            d="M10 78 Q18 65 50 60 L70 58 Q50 68 30 75 Z"
            fill="white"
            opacity="0.1"
        />
        {/* Laces area */}
        <path
            d="M80 30 L80 68 Q110 60 130 55 L130 22 Q100 18 80 30 Z"
            fill="white"
            opacity="0.07"
        />
        {/* Laces */}
        {[0, 1, 2, 3, 4].map(i => (
            <line
                key={i}
                x1="85"
                y1={32 + i * 8}
                x2="128"
                y2={26 + i * 7}
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.5"
            />
        ))}
        {/* Tongue */}
        <path
            d="M80 30 Q90 22 100 20 Q110 18 120 22 L130 22 Q100 18 80 30 Z"
            fill="white"
            opacity="0.15"
        />
        {/* Heel */}
        <path
            d="M165 30 Q185 32 190 52 Q192 65 175 70 L155 72 Q175 62 170 42 Q165 30 165 30 Z"
            fill="white"
            opacity="0.08"
        />
    </svg>
);

const floatingShoes = [
    { x: '5%', y: '15%', size: 160, color: '#D4AF37', delay: 0, rotate: -20, duration: 5 },
    { x: '75%', y: '10%', size: 120, color: '#a07020', delay: 0.8, rotate: 15, duration: 6 },
    { x: '15%', y: '65%', size: 140, color: '#D4AF37', delay: 1.5, rotate: -10, duration: 4.5, flip: true },
    { x: '70%', y: '60%', size: 180, color: '#c09030', delay: 0.3, rotate: 25, duration: 5.5 },
    { x: '45%', y: '5%', size: 100, color: '#D4AF37', delay: 1.2, rotate: -30, duration: 7 },
    { x: '55%', y: '75%', size: 110, color: '#b08030', delay: 0.6, rotate: 10, duration: 4, flip: true },
];

const NotFound: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-screen bg-[#01261C] overflow-hidden flex flex-col items-center justify-center">
            {/* Radial glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
            </div>

            {/* Grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-5"
                style={{
                    backgroundImage: 'linear-gradient(rgba(212,175,55,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.5) 1px, transparent 1px)',
                    backgroundSize: '60px 60px',
                }}
            />

            {/* Floating Shoes */}
            {floatingShoes.map((shoe, i) => (
                <motion.div
                    key={i}
                    className="absolute pointer-events-none"
                    style={{ left: shoe.x, top: shoe.y, rotate: shoe.rotate }}
                    animate={{
                        y: [0, -18, 0],
                        rotate: [shoe.rotate, shoe.rotate + 5, shoe.rotate],
                        opacity: [0.25, 0.45, 0.25],
                    }}
                    transition={{
                        duration: shoe.duration,
                        delay: shoe.delay,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                >
                    <ShoeSVG
                        className="drop-shadow-lg"
                        flip={shoe.flip}
                        style={{ width: shoe.size, height: 'auto', color: shoe.color } as React.CSSProperties}
                    />
                </motion.div>
            ))}

            {/* Main Content */}
            <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
                {/* 404 Glitch Number */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, type: 'spring', stiffness: 120 }}
                    className="relative mb-4 select-none"
                >
                    <h1
                        className="text-[10rem] md:text-[14rem] font-black leading-none text-transparent"
                        style={{
                            WebkitTextStroke: '2px rgba(212,175,55,0.3)',
                            textShadow: '0 0 60px rgba(212,175,55,0.15)',
                        }}
                    >
                        404
                    </h1>
                    {/* Glitch layer 1 */}
                    <motion.h1
                        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none text-primary/40"
                        animate={{ x: [-3, 3, -3], opacity: [0.6, 0, 0.6] }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                        aria-hidden="true"
                    >
                        404
                    </motion.h1>
                    {/* Glitch layer 2 */}
                    <motion.h1
                        className="absolute inset-0 text-[10rem] md:text-[14rem] font-black leading-none text-white/20"
                        animate={{ x: [3, -3, 3], opacity: [0, 0.5, 0] }}
                        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.4 }}
                        aria-hidden="true"
                    >
                        404
                    </motion.h1>
                </motion.div>

                {/* Shoe icon divider */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                    className="flex items-center justify-center gap-4 mb-8"
                >
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent to-primary/40" />
                    <ShoeSVG style={{ width: 60, color: '#D4AF37' } as React.CSSProperties} />
                    <div className="flex-1 h-px bg-gradient-to-l from-transparent to-primary/40" />
                </motion.div>

                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-4"
                >
                    Lost Your Step?
                </motion.h2>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="text-gray-400 text-lg mb-12 leading-relaxed"
                >
                    Looks like this page walked away. The sneaker you're looking for doesn't exist — but our collection does.
                </motion.p>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center justify-center gap-3 bg-primary text-[#01261C] px-10 py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.4)] hover:shadow-[0_0_50px_rgba(212,175,55,0.7)] hover:bg-white hover:scale-105 transition-all duration-300"
                    >
                        <Home size={20} /> Go Home
                    </button>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center justify-center gap-3 bg-white/15 border-2 border-white/50 text-white px-10 py-4 rounded-xl font-black uppercase tracking-widest hover:bg-white hover:text-[#01261C] hover:border-white hover:scale-105 transition-all duration-300"
                    >
                        <ArrowLeft size={20} /> Go Back
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default NotFound;
