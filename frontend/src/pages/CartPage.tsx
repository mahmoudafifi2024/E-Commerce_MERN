import { Container, Typography, Box, ButtonGroup, Button } from "@mui/material";
import { useCart } from "../Cart/CartContext";

export default function CartPage() {
const { cartItems, totalAmount } = useCart();

return (
    <Container fixed sx={{ mt: 2 }}>
    <Typography variant="h4" gutterBottom>
        My Cart
    </Typography>

    {cartItems.length > 0 ? (
        cartItems.map((item) => (
        <Box
            key={item.productId}
            sx={{ display:"flex",
                flexDirection:"row",
                justifyContent:"space-between",
                alignItems:"center",
                p: 2, borderBottom: "1px solid #ddd" }}
        >
            
            <Box display="flex" flexDirection="row" alignItems="center" gap={2}>
                <img width={150} src={item.image}  />
                <Box p={5}>
                    <Typography variant="h4">{item.title}</Typography>
                    <Typography variant="h6">
                    {item.quantity} x {item.unitPrice} EGP
                    </Typography>
                </Box>
            </Box>

            <ButtonGroup variant="contained" aria-label="Basic button group">
            <Button>-</Button>
            <Button>+</Button>
            </ButtonGroup>
            <Button>REMOVE</Button>
        </Box>
        ))
    ) : (
        <Typography variant="body1" sx={{ mt: 2 }}>
        Your cart is empty.
        </Typography>
    )}

    <Typography variant="h5" sx={{ mt: 3 }}>
        Total: {totalAmount.toFixed(2)} EGP
    </Typography>
    </Container>
);
}
