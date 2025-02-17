import productModel from "../models/productModel";

export const getAllProducts = async()=>{
    return await productModel.find()
}

export const seedInitialProducts = async()=>{
    try{
        const products = [
            { title: "HP Laptop", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWcrGOZzAXiHy79PyFMasWeV-AnrsWbhfZNQ&s", price: 20000, stock: 10 },
            { title: "Lenovo Laptop", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZr3Aa8U7RgO37nqtCQ_c8nVy2EmKZyf1F5Q&s", price: 40000, stock: 10 }
        ]
        
        const existingProducts = await getAllProducts()
            
            if(existingProducts.length === 0){
                await productModel.insertMany(products)
            }
    }catch(err){
        console.error("cannot see database", err)
    }
    
}