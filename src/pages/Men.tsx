import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Men: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-widest mb-6">Men's Footwear</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Discover the latest arrivals in men's sneakers, boots, and performance wear.
                </p>
            </div>

            {/* We can reuse the ProductGrid here as a placeholder for now */}
            <ProductGrid />
        </div>
    );
};

export default Men;
