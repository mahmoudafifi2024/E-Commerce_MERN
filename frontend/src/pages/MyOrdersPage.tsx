    import { Container, Typography, Box } from "@mui/material";
    import { useAuth } from "../context/Auth/AuthContext";
    import { useEffect } from "react";

    interface Order {
    _id: string;
    address: string;
    total: number;
    }

    export default function MyOrdersPage() {
    const { getMyOrders, myOrders } = useAuth();

    useEffect(() => {
        getMyOrders();
    }, []);

    console.log(myOrders)

    return (
        <Container
        fixed
        sx={{
            mt: 2,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
        }}
        >
        {myOrders && myOrders.length > 0 ? (
            myOrders.map(({ _id , address , total}: Order) => (
            <Box key={_id} sx={{ width: "100%", border: 1, borderColor: "gray", p: 2 }}>
                <Typography  align="center">{_id}</Typography>
                <Typography  align="center">{_id}</Typography>
                <Typography  align="center">{address}</Typography>
                <Typography  align="center">{total}</Typography>
            </Box>
            ))
        ) : (
            <Typography variant="h6" align="center">No orders found.</Typography>
        )}
        </Container>
    );
    }
