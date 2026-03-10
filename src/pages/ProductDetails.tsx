import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useProducts } from '../hooks/useProducts';
import { ArrowLeft, ShoppingBag } from 'lucide-react';
import { useCart } from '../hooks/useCart';

const ProductDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { products, isLoading } = useProducts();

    const product = products.find(p => p.id === id);
    const [activeImage, setActiveImage] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string>('');
    const { addToCart } = useCart();

    if (isLoading) {
        return <div className="min-h-screen pt-32 bg-[#01261C] flex justify-center text-white">Loading...</div>;
    }

    if (!product) {
        return <div className="min-h-screen pt-32 bg-[#01261C] flex justify-center text-white">Product not found</div>;
    }

    return (
        <div className="min-h-screen pt-32 pb-20 bg-[#01261C]">
            <div className="container mx-auto px-6 max-w-6xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8"
                >
                    <ArrowLeft size={20} /> Back to Products
                </button>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {/* Image Gallery */}
                    <div className="space-y-4">
                        <div className="aspect-square rounded-2xl overflow-hidden bg-black/20 border border-white/10">
                            <img
                                src={product.images[activeImage]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        {product.images.length > 1 && (
                            <div className="grid grid-cols-4 gap-4">
                                {product.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => setActiveImage(idx)}
                                        className={`aspect-square rounded-xl overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-primary opacity-100' : 'border-transparent opacity-50 hover:opacity-100'
                                            }`}
                                    >
                                        <img src={img} alt={`${product.name} preview`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="text-white">
                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-widest mb-2">{product.brand}</h1>
                        <h2 className="text-2xl text-primary font-bold mb-6">{product.name}</h2>

                        <div className="text-3xl font-black mb-8 border-b border-white/10 pb-8">
                            {product.price.toLocaleString()} ETB
                        </div>

                        <div className="space-y-6 mb-8">
                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Details</h3>
                                <ul className="space-y-2 text-gray-300">
                                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Origin:</strong> {product.origin}</li>
                                    <li className="flex gap-2"><span className="text-primary">•</span> <strong>Quality:</strong> {product.quality}</li>
                                </ul>
                            </div>

                            <div>
                                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-3">Available Sizes</h3>
                                <div className="flex flex-wrap gap-3">
                                    {product.sizes.map(size => (
                                        <button
                                            key={size}
                                            onClick={() => setSelectedSize(size)}
                                            className={`px-4 py-2 border-2 rounded-lg font-bold transition-all duration-200 ${selectedSize === size
                                                ? 'bg-primary text-[#01261C] border-primary shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                                                : 'bg-white/10 border-white/30 text-white hover:border-primary hover:bg-white/20'
                                                }`}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => {
                                if (!selectedSize) {
                                    alert('Please select a size first');
                                    return;
                                }
                                addToCart(product, selectedSize);
                            }}
                            className="w-full flex items-center justify-center gap-3 bg-[#D4AF37] text-[#01261C] py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_0_30px_rgba(212,175,55,0.35)] hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] hover:bg-white hover:scale-[1.02] transition-all duration-300"
                        >
                            <ShoppingBag size={20} /> Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
