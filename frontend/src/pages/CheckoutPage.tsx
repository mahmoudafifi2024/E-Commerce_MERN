    import { Container, Typography, Box, Button, TextField } from "@mui/material";
    import { useCart } from "../Cart/CartContext";
import { useRef } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/Auth/AuthContext";

    export default function CheckoutPage() {
    const { cartItems, totalAmount } = useCart();
    const { token } = useAuth();

    const addressRef = useRef<HTMLInputElement>(null);

    const navigate = useNavigate()

    const handleConfirmOrder = async ()=>{
        const address = addressRef.current?.value; 

        if(!address) return

        const response = await fetch(`${BASE_URL}/cart/checkout`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                address,
            })
        });

        if (!response.ok) return

        navigate('/order-success')

    } 

    const renderCartItems = () => {
        if (cartItems.length > 0) {
        return cartItems.map((item) => (
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
            </Box>
        ));
        } else {
        return (
            <Typography variant="body1" sx={{ mt: 2 }}>
            Your cart is empty.
            </Typography>
        );
        }
    };

    return (
        <Container fixed sx={{ mt: 2 }}>
        <Box display="flex" flexDirection="row" justifyContent="space-between">
            <Typography variant="h4" gutterBottom>
            Checkout
            </Typography>
        </Box>

        <TextField inputRef={addressRef} label="Delivery Address" name="address" />

        {renderCartItems()}

        <Box
            sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            }}
        >
            <Typography variant="h5" sx={{ mt: 3 }}>
            Total: {totalAmount.toFixed(2)} EGP
            </Typography>
            <Button onClick={handleConfirmOrder} variant="contained">Pay Now</Button>
        </Box>
        </Container>
    );
    }
