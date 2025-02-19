import dotenv from "dotenv";

import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import cartRoute from "./routes/cartRoute";
import { seedInitialProducts } from "./services/productService";
import cors from "cors";

dotenv.config();

const app = express();
const port = 3001;

app.use(express.json());

// const corsOptions = {
//   origin: ["https://ecommerce-mern-frontend.vercel.app"],
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
// };

// app.use(cors(corsOptions));
app.use(cors());

mongoose
.connect(process.env.DATABASE_URL || "")
.then(() => console.log("Mongo ATLAS connected!"))
.catch((err) => console.log("Failed to connect!", err));

console.log("DATABASE_URL:", process.env.DATABASE_URL);

// Seed the products to database
seedInitialProducts();

app.use("/user", userRoute);
app.use("/product", productRoute);
app.use("/cart", cartRoute);

app.listen(port, () => {
  console.log(`Server is running at: http://localhost:${port}`);
});
