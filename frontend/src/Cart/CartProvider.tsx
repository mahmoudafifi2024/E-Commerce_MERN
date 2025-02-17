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
                console.log(error)
                return;
            }

            const cart = await response.json();
            const cartItemsMapped = cart.items.map(
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
            console.log(error)
        }
    };

    useEffect(() => {
        fetchCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                console.log(error)
                return;
            }

            fetchCart();
        } catch (error) {
            console.error("Error adding item to cart:", error);
            setError("Something went wrong while adding the item.");
            console.log(error)
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
                console.log(error)
                return;
            }

            fetchCart();
        } catch (error) {
            console.error("Error updating item in cart:", error);
            setError("Something went wrong while updating the item.");
            console.log(error)
        }
    };

    const removeItemInCart = async (productId: string) => {
        try {
            const response = await fetch(`${BASE_URL}/cart/items/${productId}`, {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                setError("Failed to Delete Cart");
                console.log(error)
                return;
            }

            fetchCart();
        } catch (error) {
            console.error("Error removing item in cart:", error);
            setError("Something went wrong while removing the item.");
            console.log(error)
        }
    };

    return (
        <CartContext.Provider value={{ cartItems, totalAmount, addItemToCart, updateItemInCart, removeItemInCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
