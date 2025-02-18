import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { useCart } from "../Cart/CartContext";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
const { cartItems, totalAmount, updateItemInCart, removeItemInCart, clearCart } = useCart();
const navigate = useNavigate()

const handleQuantity = (productId: string, quantity: number) => {
    if(quantity <= 0){
        return
    }
    
    updateItemInCart(productId, quantity);
};

const handleRemoveItem = (productId: string) => {
    removeItemInCart(productId)
};


const handleCheckout = (productId: string) => {
    navigate('/checkout')
};



return (
    <Container fixed sx={{ mt: 2 }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
    <Typography variant="h4" gutterBottom>
        My Cart
    </Typography>
    <Button onClick={() => clearCart()}>REMOVE All</Button>
        </Box>

    {cartItems.length > 0 ? (
        cartItems.map((item) => (
        <Box
            key={item.productId}
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ddd",
            }}
        >
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
            <img width={150} src={item.image} alt={item.title} />
            <Box p={5}>
                <Typography variant="h4">{item.title}</Typography>
                <Typography variant="h6">
                {item.quantity} x {item.unitPrice} EGP
                </Typography>
            </Box>
            </Box>

            <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button onClick={() => handleQuantity(item.productId, item.quantity - 1)}>-</Button>
            <Button onClick={() => handleQuantity(item.productId, item.quantity + 1)}>+</Button>
            </ButtonGroup>
            <Button onClick={() => handleRemoveItem(item.productId)}>REMOVE</Button>
        </Box>
        ))
    ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
        Your cart is empty.
        </Typography>
    )}

    <Box sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2
            }}>
    <Typography variant="h5" sx={{ mt: 3 }}>
        Total: {totalAmount.toFixed(2)} EGP
    </Typography>
    <Button onClick={handleCheckout} variant="contained">Go to Checkout</Button>
    </Box>
    </Container>
);
}
