import { CheckCircleOutline } from "@mui/icons-material";
import { Container, Typography } from "@mui/material";

export default function OrderSuccessPage() {
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
    <CheckCircleOutline sx={{ fontSize: 80, color: 'green' }} />

    <Typography variant="h4" align="center">
        Thanks for your Order
    </Typography>
    
    <Typography variant="h6" align="center">
        We started processing it and we will get back to you soon
    </Typography>
    </Container>
);
}
