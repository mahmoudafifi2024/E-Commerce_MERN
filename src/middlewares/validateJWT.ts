import { Response , Request,NextFunction } from "express";
import jwt from 'jsonwebtoken'
import userModel from "../models/userModel";
import { ExtendRequest } from "../types/extendedRequest";



const validateJWT = (req: ExtendRequest, res: Response ,  next: NextFunction)=>{
    const authorizationHeader = req.get('authorization')

    if(!authorizationHeader){
        res.status(403).send("Authorization header was not provided");
        return 
    }

    const token = authorizationHeader.split(" ")[1];
    if(!token){
        res.status(403).send("Bearer token not found")
    }

    jwt.verify(token , 'bg6p2s0PcQdazBsEgeynHWi8Dra4VAip', async (err,payload)=> {
        if(err){
            res.status(403).send("Invalid token")
            return
        }

        if(!payload){
            res.status(403).send("Invalid token payload")
            return
        }

        const userPayload = payload as {
            email: string;
            firstName: string;
            lastName: string;
        };

        // Fetch user from database based on the payload
        const user = await userModel.findOne({ email: userPayload.email })
        req.user = user;
        console.log("User in request:", req.user);
        next();
    })
}


export default validateJWT