import { Container } from "@mui/material";
import Typography from '@mui/material/Typography';
import { useEffect, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useCart } from "../Cart/CartContext";


export default function CartPage() {

    const {token} = useAuth()
    const {cartItems, totalAmount} = useCart()
    const [error, setError] = useState("")

    // useEffect(()=>{

    //     if(!token){
    //         return
    //     }

    //     const fetchCart = async()=>{
    //         const response = await fetch(`${BASE_URL}/cart`, {
    //             headers: {
    //                 "Authorization": `Bearer ${token}`
    //             }
    //         });

    //         if(!response.ok){
    //             setError('Failed to fetch user cart, Please try again')
    //         }

    //         const data = await response.json()
    //         setCart(data)
    //     }

    //     fetchCart()
    // },[token])
    
return (
    <Container sx={{mt:2}}>
    <Typography variant="h4">My Cart</Typography>
    {cartItems.map((item)=>{
        <Box>{item.title}</Box>
    })}
    </Container>
)
}
