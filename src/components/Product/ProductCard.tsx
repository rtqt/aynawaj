import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, ChevronLeft, ChevronRight, CheckCircle2, Globe2, Ruler } from 'lucide-react';
import { Product } from '../../types/product';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';

interface ProductCardProps {
    product: Product;
    index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
    const { t } = useTranslation();
    const [currentImage, setCurrentImage] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev + 1) % product.images.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImage((prev) => (prev - 1 + product.images.length) % product.images.length);
    };


    return (
        <Link
            to={`/product/${product.id}`}
            className="block group relative bg-white/5 border border-white/10 hover:border-primary/30 rounded-[2rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(212,175,55,0.1)]"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Image Gallery Header */}
            <div className="relative aspect-[4/3] overflow-hidden bg-black/40">
                <AnimatePresence mode="wait">
                    <motion.img
                        key={currentImage}
                        src={product.images[currentImage]}
                        alt={`${product.brand} ${product.name}`}
                        initial={{ opacity: 0, scale: 1.05 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="w-full h-full object-cover"
                    />
                </AnimatePresence>

                {/* Gallery Controls */}
                {product.images.length > 1 && (
                    <div className={`absolute inset-0 flex items-center justify-between px-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                        <button
                            onClick={prevImage}
                            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary hover:text-black transition-colors"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={nextImage}
                            className="p-1.5 rounded-full bg-black/50 text-white backdrop-blur-md hover:bg-primary hover:text-black transition-colors"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                )}

                {/* Dots */}
                {product.images.length > 1 && (
                    <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                        {product.images.map((_, i) => (
                            <div
                                key={i}
                                className={`h-1 rounded-full transition-all duration-300 ${i === currentImage ? 'w-4 bg-primary' : 'w-1.5 bg-white/50'}`}
                            />
                        ))}
                    </div>
                )}

                {/* Brand Badge */}
                <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-black/60 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-widest rounded-full border border-white/10">
                        {product.brand}
                    </span>
                </div>
            </div>

            {/* Product Details Layout */}
            <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-1 group-hover:text-primary transition-colors">
                            {product.name}
                        </h3>
                        <div className="flex items-center gap-1.5 text-primary text-xs font-medium">
                            <CheckCircle2 size={12} fill="currentColor" className="text-[#01261C]" />
                            <span className="uppercase tracking-wider">{product.quality}</span>
                        </div>
                    </div>
                </div>

                {/* Telegram Data Attributes */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary">
                            <Globe2 size={14} />
                        </div>
                        <span className="capitalize">{product.origin}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm text-gray-400">
                        <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-primary">
                            <Ruler size={14} />
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {product.sizes.map(size => (
                                <span key={size} className="px-2 py-0.5 rounded border border-white/10 text-xs">
                                    {size}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Footer: Price & Action */}
                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest mb-0.5">Price</p>
                        <p className="text-2xl font-black text-white">
                            {product.price.toLocaleString()} <span className="text-sm font-normal text-primary">ETB</span>
                        </p>
                    </div>

                    <div
                        className="flex items-center gap-2 px-5 py-2.5 bg-[#D4AF37] text-[#01261C] rounded-xl font-black shadow-[0_0_15px_rgba(212,175,55,0.3)] hover:shadow-[0_0_25px_rgba(212,175,55,0.6)] hover:bg-white hover:scale-105 transition-all duration-300 group/btn"
                    >
                        <ShoppingBag size={16} className="group-hover/btn:scale-110 transition-transform" />
                        <span className="text-sm">View</span>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
