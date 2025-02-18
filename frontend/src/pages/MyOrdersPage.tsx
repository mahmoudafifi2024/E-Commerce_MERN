import { Container, Typography, Box } from "@mui/material";
import { useAuth } from "../context/Auth/AuthContext";
import { useEffect } from "react";

export default function MyOrdersPage() {
    
    const { getMyOrders, myOrders } = useAuth();

    useEffect(() => {
        
        const fetchOrders = async () => {
            await getMyOrders(); 
            
        };
        fetchOrders();
    }, [getMyOrders]);

    return (
        <Container 
            fixed 
            sx={{ 
                mt: 2,
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: 2 
            }}
        >
            {myOrders.length > 0 ? (
                myOrders.map(({ _id, address, total, orderItems}) => (
                    <Box key={_id} sx={{ width: '100%' }}>
                        <Typography variant="h4" align="center">{_id}</Typography>
                        <Typography variant="h6" align="center">{address}</Typography>
                        <Typography variant="h6" align="center">Items: {orderItems}</Typography>
                        <Typography variant="h6" align="center">Total: {total}</Typography>
                    </Box>
                ))
            ) : (
                <Typography variant="h5" align="center">No orders found</Typography>
            )}
        </Container>
    );
}
