import React from 'react';
import ProductGrid from '../components/ProductGrid';

const Women: React.FC = () => {
    return (
        <div className="pt-32 pb-20 min-h-screen">
            <div className="container mx-auto px-6 text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-black text-primary uppercase tracking-widest mb-6">Women's Footwear</h1>
                <p className="text-gray-400 max-w-2xl mx-auto">
                    Explore our exclusive selection of women's sneakers, blending style with cutting-edge comfort.
                </p>
            </div>

            {/* We can reuse the ProductGrid here as a placeholder */}
            <ProductGrid />
        </div>
    );
};

export default Women;
