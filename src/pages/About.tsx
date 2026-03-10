import React from 'react';

const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-widest mb-8 text-center">About Us</h1>

            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-12 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Our Story</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                    Founded with a passion for premium footwear, Aynawaj Shoes brings the finest quality sneakers and boots directly to you. What started as a dedicated channel on Telegram has evolved into a modern shopping experience, without losing the personal touch and curated selection our customers love.
                </p>

                <h2 className="text-2xl font-bold text-white mb-4 mt-12">Quality Promise</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                    Every pair of shoes we offer—whether made in Vietnam, China, or curated locally—is rigorously inspected. We believe that top-tier quality shouldn't be a luxury, but the standard. We guarantee authenticity and durability in every step you take.
                </p>
            </div>
        </div>
    );
};

export default About;
