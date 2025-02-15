import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { useRef, useState } from "react";
import { BASE_URL } from "../constants/baseUrl";
import { useAuth } from "../context/Auth/AuthContext";
import { useNavigate } from "react-router-dom";


export default function RegisterPage() {
    // Error message
    const [error, setError] = useState("")
    
    const firstNameRef = useRef<HTMLInputElement>(null);
    const lastNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    const {login} = useAuth()
    const navigate = useNavigate()

    
    const onSubmit = async () => {
        const firstName = firstNameRef.current?.value;
        const lastName = lastNameRef.current?.value;
        const email = emailRef.current?.value; 
        const password = passwordRef.current?.value;  
        
        // Validate the form data
        if(!firstName || !lastName || !email || !password){
            setError("Check submited data")
            return
        }

        // Make the call to API to Create the user
        const response = await fetch(`${BASE_URL}/user/register`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                firstName, 
                lastName, 
                email, 
                password,
            })
        });

        if(!response.ok){
            setError("Unable to register user, Please try different credientials!")
            return
        }

        const token = await response.json()

        if(!token){
            setError("Incorrect token")
            return
        }

        login(email, token)

        navigate('/')

        console.log(token)
    };
    
return (
    <Container>
    <Box sx={{ 
        display: "flex", 
        flexDirection:"column",
        justifyContent: "center",
        alignItems:"center",
        mt:4 }}>
        <Typography variant="h4">Register New Account</Typography>
        <Box sx={{
            display:"flex",
            flexDirection:"column",
            justifyContent: "center",
            alignItems:"center",
            gap:2,
            mt:4,
            }}>
            <TextField inputRef={firstNameRef} label="First Name" name="firstName"/>
            <TextField inputRef={lastNameRef} label="Last Name" name="lastName"/>
            <TextField inputRef={emailRef} label="Email" name="email"/>
            <TextField inputRef={passwordRef} type="password" label="Password" name="password"/>
            <Button onClick={onSubmit} variant="contained">Register</Button>
            {error && <Typography sx={{color:"red"}}>{error}</Typography>}
        </Box>
    </Box>
    </Container>
);
}
