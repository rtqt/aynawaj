import React, { useEffect } from 'react';
import { useCart } from '../hooks/useCart';
import { X, Trash2, Send, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const CartSidebar: React.FC = () => {
    const { items, removeFromCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();

    useEffect(() => {
        const handlePopState = () => {
            if (isCartOpen) {
                setIsCartOpen(false);
            }
        };

        if (isCartOpen) {
            window.history.pushState({ cartOpen: true }, '');
            window.addEventListener('popstate', handlePopState);
        }

        return () => {
            window.removeEventListener('popstate', handlePopState);
            if (isCartOpen && window.history.state?.cartOpen) {
                window.history.back();
            }
        };
    }, [isCartOpen, setIsCartOpen]);

    const handleTelegramCheckout = () => {
        if (items.length === 0) return;

        let message = `🛒 *New Order from Anyawaj Shoes*%0A%0A`;

        items.forEach((item, index) => {
            message += `${index + 1}. *${item.product.brand} - ${item.product.name}*%0A`;
            message += `   Size: ${item.size} | Qty: ${item.quantity}%0A`;
            message += `   Price: ${item.product.price.toLocaleString()} ETB%0A`;
            message += `   Link: ${window.location.origin}/product/${item.product.id}%0A%0A`;
        });

        message += `*%0ATotal Price: ${totalPrice.toLocaleString()} ETB*`;

        // Assuming all items go to the same telegram contact for now, 
        // or we can use a central store contact. We'll use the contact of the first item as a fallback.
        const contact = items[0]?.product.telegramUsername.replace('@', '') || 'Aynawaj1';

        window.open(`https://t.me/${contact}?text=${message}`, '_blank');
    };

    return (
        <AnimatePresence>
            {isCartOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsCartOpen(false)}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 h-full w-full max-w-md bg-[#01261C] border-l border-white/10 z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="md:hidden p-2 -ml-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                                >
                                    <ArrowLeft size={24} />
                                </button>
                                <h2 className="text-2xl font-black text-white uppercase tracking-widest">Your Cart</h2>
                            </div>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="hidden md:block p-2 text-gray-400 hover:text-white rounded-full hover:bg-white/5 transition-colors"
                            >
                                <X size={24} />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400">
                                    <p className="mb-4">Your cart is empty</p>
                                    <button
                                        onClick={() => setIsCartOpen(false)}
                                        className="text-primary hover:text-white underline"
                                    >
                                        Continue Shopping
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={`${item.product.id}-${item.size}`} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                        <img
                                            src={item.product.images[0]}
                                            alt={item.product.name}
                                            className="w-20 h-20 object-cover rounded-lg"
                                        />
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start">
                                                <div>
                                                    <p className="text-xs font-bold text-gray-400 uppercase">{item.product.brand}</p>
                                                    <h3 className="text-white font-bold">{item.product.name}</h3>
                                                </div>
                                                <button
                                                    onClick={() => removeFromCart(item.product.id, item.size)}
                                                    className="text-gray-500 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                            <div className="mt-2 flex justify-between items-center text-sm">
                                                <span className="text-gray-300">Size: {item.size} x {item.quantity}</span>
                                                <span className="font-bold text-primary">
                                                    {(item.product.price * item.quantity).toLocaleString()} ETB
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 bg-black/20">
                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-gray-400 font-bold uppercase tracking-widest">Total</span>
                                    <span className="text-2xl font-black text-white">{totalPrice.toLocaleString()} ETB</span>
                                </div>
                                <button
                                    onClick={handleTelegramCheckout}
                                    className="w-full flex items-center justify-center gap-3 bg-primary text-[#01261C] py-4 rounded-xl font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-white hover:text-[#01261C] hover:scale-[1.02] transition-all duration-300"
                                >
                                    <Send size={20} /> Checkout via Telegram
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CartSidebar;
