import { Container, Typography, Box } from "@mui/material";
import { useCart } from "../Cart/CartContext";

export default function CartPage() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { cartItems, totalAmount } = useCart();

    return (
        <Container sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>
                My Cart
            </Typography>

            {cartItems.length > 0 ? (
                cartItems.map((item) => (
                    <Box sx={{ p: 2, borderBottom: "1px solid #ddd" }}>
                        <Typography variant="h6">{item.title}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="body1" sx={{ mt: 2 }}>
                    Your cart is empty.
                </Typography>
            )}
        </Container>
    );
}
