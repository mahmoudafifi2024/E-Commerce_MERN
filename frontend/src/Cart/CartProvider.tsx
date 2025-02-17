import { FC, PropsWithChildren, useEffect, useState } from "react";
import { CartContext } from "./CartContext";
import { CartItem } from "../types/CartItem";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";

const CartProvider: FC<PropsWithChildren> = ({ children }) => {
    const { token } = useAuth();
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [error, setError] = useState("");

    const fetchCart = async () => {
        if (!token) return;
        
        try {
            const response = await fetch(`${BASE_URL}/cart`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            
            if (!response.ok) {
                setError("Failed to fetch user cart, Please try again");
                return;
            }

            const cart = await response.json();
            const cartItemsMapped = cart.items.map(
                ({ product, quantity, unitPrice }: { product: any; quantity: number; unitPrice: number }) => ({
                    productId: product._id,
                    title: product.title,
                    image: product.image,
                    unitPrice,
                    quantity,
                })
            );

            setCartItems(cartItemsMapped);
            setTotalAmount(cart.totalAmount);
        } catch (error) {
            console.error("Error fetching cart:", error);
            setError("Something went wrong while fetching the cart.");
        }
    };

    useEffect(() => {
        fetchCart();
    }, [token]);

    const addItemToCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity: 1,
                }),
            });

            if (!response.ok) {
                setError("Unable to add item to cart, please try again!");
                return;
            }

            fetchCart();
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setError("Something went wrong while adding the item.");
        }
    };

    const updateItemInCart = async (productId: string, quantity: number) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    productId,
                    quantity,
                }),
            });

            if (!response.ok) {
                setError("Failed to update Cart");
                return;
            }

            fetchCart();
        } catch (error) {
            console.error("Error updating item in cart:", error);
            setError("Something went wrong while updating the item.");
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
