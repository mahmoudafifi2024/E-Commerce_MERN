
import Grid from "@mui/material/Grid";
import ProductCard from "../components/ProductCard";
import Container from '@mui/material/Container';
import { useEffect, useState } from "react";
import { Product } from "../types/Product";
import { BASE_URL } from "../constants/baseUrl";
import { Box } from "@mui/material";

export default function HomePage() {
    const [products, setProducts] = useState<Product[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${BASE_URL}/product`);
                const data = await response.json();
                setProducts(data);
            } catch {
                setError(true);
            }
        };
    
        fetchData(); 
    }, []);
    

    if(error){
        return <Box>Try Again</Box>
    }


return (
    <Container sx={{marginTop:2}}>
        <Grid container spacing={2}>
            {products.map((p)=>(
                <Grid item md={4}><ProductCard {...p}/></Grid>
            ))}
        </Grid>
    </Container>
)
}
