import dotnev from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from './routes/productRoute'
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import  cors from 'cors'
dotnev.config()

const app = express();
const port = 3001;

app.use(express.json())
app.use(cors())

mongoose
    .connect(process.env.DATABASE_URL || '')
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log("MongoDB Failed", err));


    // Seed the products to database
    seedInitialProducts()

app.use("/user", userRoute)
app.use("/product", productRoute)
app.use("/cart", cartRoute)





app.listen(port , ()=>console.log(`Server is running at : http://localhost:${port}`))