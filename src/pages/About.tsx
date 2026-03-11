import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Package, Clock, RefreshCw, ArrowRight } from 'lucide-react';

const About: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen container mx-auto px-6 max-w-4xl">
            <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-widest mb-4 text-center">About AYNAWAJ</h1>
            <p className="text-center text-gray-400 mb-16 max-w-xl mx-auto">We sell shoes we'd buy ourselves. That's the whole idea.</p>

            {/* Origin Story */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">How It Started</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    AYNAWAJ started as a Telegram channel. No website, no storefront — just a channel where we posted shoes we found, vetted, and stood behind. People kept coming back, orders kept growing, and eventually we built this.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    The channel is still alive. The curated approach is the same. What changed is that buying is now easier, and you can see everything in one place.
                </p>
            </div>

            {/* Quality Process */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-6">What We Actually Check</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                        { icon: <ShieldCheck className="text-primary" size={22} />, title: "Stitching & Construction", desc: "We inspect seams and sole adhesion on every pair. If it looks like it'll come apart in a month, it doesn't make the list." },
                        { icon: <Package className="text-primary" size={22} />, title: "Finish & Materials", desc: "We check material quality, colorways, and how it holds up to handling. Cheap-looking materials get cut before listing." },
                        { icon: <Clock className="text-primary" size={22} />, title: "Sizing Accuracy", desc: "We only list sizes we can actually verify. No guessing. If there's a sizing quirk, we note it." },
                        { icon: <RefreshCw className="text-primary" size={22} />, title: "Your Guarantee", desc: "Not happy with your order? Contact us within 7 days. We'll do a full exchange or refund — no runaround." }
                    ].map((item, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="mt-1 flex-shrink-0 w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center">
                                {item.icon}
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-1">{item.title}</h4>
                                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sourcing */}
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 mb-8 backdrop-blur-sm">
                <h2 className="text-2xl font-bold text-white mb-4">Where the Shoes Come From</h2>
                <p className="text-gray-400 leading-relaxed mb-4">
                    We source from factories in Vietnam, Turkey, and China. We're not hiding that — most footwear comes from these regions, including brands that charge five times what we do.
                </p>
                <p className="text-gray-400 leading-relaxed">
                    The difference is we choose suppliers based on output quality, not lowest unit cost. We'd rather carry fewer styles and know every one of them is worth wearing.
                </p>
            </div>

            {/* CTA */}
            <div className="rounded-3xl bg-primary/10 border border-primary/20 p-8 md:p-12 text-center">
                <h2 className="text-2xl font-bold text-white mb-3">Ready to find your pair?</h2>
                <p className="text-gray-400 mb-8">New stock lands every week. Browse what's in right now.</p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-[#01261C] rounded-2xl font-black uppercase tracking-widest hover:bg-white transition-colors"
                    >
                        Shop Now <ArrowRight size={18} />
                    </Link>
                    <a
                        href="https://t.me/aynawajshoes"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-bold uppercase tracking-widest hover:bg-white/10 transition-colors"
                    >
                        Message Us on Telegram
                    </a>
                </div>
            </div>
        </div>
    );
};

export default About;
