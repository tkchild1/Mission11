import React from "react";
import type { CartItem } from "../types/CartItem";

interface CartContextType {
    cart: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (bookId: number) => void;
    updateQuantity: (bookId: number, quantity: number) => void;
    clearCart: () => void;
}

const CartContext = React.createContext<CartContextType>({
    cart: [],
    addToCart: () => {},
    removeFromCart: () => {},
    updateQuantity: () => {},
    clearCart: () => {}
});

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cart, setCart] = React.useState<CartItem[]>([]);

    const addToCart = (item: CartItem) => {
        setCart(prevCart => {
            const existingItem = prevCart.find(cartItem => cartItem.bookId === item.bookId);
            const updatedCart = prevCart.map(cartItem =>
                cartItem.bookId === item.bookId
                    ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
                    : cartItem
            );
            return existingItem ? updatedCart : [...prevCart, item];
        });
    };

    const removeFromCart = (bookId: number) => {
        setCart(prevCart => prevCart.filter(item => item.bookId !== bookId));
    };

    const updateQuantity = (bookId: number, quantity: number) => {
        setCart(prevCart =>
            prevCart.map(item =>
                item.bookId === bookId ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => React.useContext(CartContext);