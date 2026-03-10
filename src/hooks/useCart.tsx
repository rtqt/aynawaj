import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product } from '../types/product';
import { toast } from 'sonner';

export interface CartItem {
    product: Product;
    size: string;
    quantity: number;
}

interface CartContextType {
    items: CartItem[];
    addToCart: (product: Product, size: string) => void;
    removeFromCart: (productId: string, size: string) => void;
    clearCart: () => void;
    totalItems: number;
    totalPrice: number;
    isCartOpen: boolean;
    setIsCartOpen: (isOpen: boolean) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [items, setItems] = useState<CartItem[]>(() => {
        const saved = localStorage.getItem('anyawaj_cart');
        return saved ? JSON.parse(saved) : [];
    });
    const [isCartOpen, setIsCartOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('anyawaj_cart', JSON.stringify(items));
    }, [items]);

    const addToCart = (product: Product, size: string) => {
        setItems(prev => {
            const existing = prev.find(item => item.product.id === product.id && item.size === size);
            if (existing) {
                return prev.map(item =>
                    item.product.id === product.id && item.size === size
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { product, size, quantity: 1 }];
        });
        toast.success(`${product.name} (Size ${size}) added to cart!`);
        setIsCartOpen(true);
    };

    const removeFromCart = (productId: string, size: string) => {
        setItems(prev => prev.filter(item => !(item.product.id === productId && item.size === size)));
    };

    const clearCart = () => setItems([]);

    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{
            items, addToCart, removeFromCart, clearCart,
            totalItems, totalPrice, isCartOpen, setIsCartOpen
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart must be used within a CartProvider');
    }
    return context;
};
