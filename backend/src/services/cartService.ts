import cartModel from "../models/cartModel";
import { IOrder, IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface CreateCartForUser{
    userId: string;
}
const createCartForUser = async ({ userId ,  }: CreateCartForUser)=>{
    const cart = await cartModel.create({userId, totalAmount: 0})
    await cart.save()
    return cart
}

interface GetActiveCartForUser{
    userId: string;
    populateProduct?: boolean
}

export const getActiveCartForUser = async ({

    userId,
    populateProduct

}: GetActiveCartForUser)=>{

    let cart 

    if(populateProduct){
        cart = await cartModel.findOne({userId, status:"active"}).populate('items.product')
    }else{
        cart = await cartModel.findOne({userId, status:"active"})
    }

    if(!cart){
        cart = await createCartForUser({userId})
    }

    return cart
};

interface ClearCart {
    userId: string
}

export const clearCart = async ({userId}: ClearCart)=>{
    
    const cart = await getActiveCartForUser({userId})

    cart.items = []
    cart.totalAmount = 0

    await cart.save()
    
    return {
        data: getActiveCartForUser({ userId, populateProduct:true}),
        statusCode: 200}
}


interface AddItemToCart {
    productId: any
    quantity: number
    userId: string
}

export const addItemToCart = async ({ productId, quantity,userId }: AddItemToCart)=>{
    const cart = await getActiveCartForUser({userId})

    // wait, Does the item exist in the cart??
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId)

    if(existsInCart){
        return {data: "item already exists in Cart", statusCode: 400}
    }

    //Fetch thw product
    const product = await productModel.findById(productId)

    if(!product){
        return {data: "Product Not found", statusCode: 400}
    }

    if(product.stock < quantity){
        return {data: "Low stock for item", statusCode: 400}
    }

    cart.items.push({ 
        product: productId, 
        unitPrice: product.price, 
        quantity})

    cart.totalAmount += product.price * quantity

    await cart.save()

    return { 
        data: getActiveCartForUser({ userId, populateProduct:true}), 
        statusCode: 200}
}

interface UpdateItemInCart {
    productId: any
    quantity: number
    userId: string
}

export const updateItemInCart = async ({ productId, quantity,userId }: UpdateItemInCart) =>{
    
    const cart = await getActiveCartForUser({userId})
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId)
    if(!existsInCart){
        return {data: "item does not exist in Cart", statusCode: 400}
    }

    const product = await productModel.findById(productId)
    if(!product){
        return {data: "Product Not found", statusCode: 400}
    }
    if(product.stock < quantity){
        return {data: "Low stock for item", statusCode: 400}
    }

    
    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId)
    
    let total = otherCartItems.reduce((sum , product)=>{
        sum += product.quantity * product.unitPrice
        return sum
    }, 0)
    
    existsInCart.quantity = quantity
    total += existsInCart.quantity * existsInCart.unitPrice

    cart.totalAmount = total
    
    await cart.save()
    
    return { 
    data: getActiveCartForUser({ userId, populateProduct:true}),
    statusCode: 200}
    
}

interface DeleteItemInCart {
    productId: any
    userId: string
}

export const deleteItemInCart = async ({ userId, productId}: DeleteItemInCart)=>{
    
    const cart = await getActiveCartForUser({userId})
    
    const existsInCart = cart.items.find((p)=> p.product.toString() === productId)
    if(!existsInCart){
        return {data: "item does not exist in Cart", statusCode: 400}
    }
    
    // this code if you want to use it again go to 84video
    const otherCartItems = cart.items.filter((p)=> p.product.toString() !== productId)
    
    const total = otherCartItems.reduce((sum , product)=>{
        sum += product.quantity * product.unitPrice
        return sum
    }, 0)
    
    cart.items = otherCartItems;
    cart.totalAmount = total;
    
    await cart.save()
    
    return { 
        data: await getActiveCartForUser({ userId, populateProduct:true}), 
        statusCode: 200}
}


interface Checkout {
    userId: string
    address: string
}

export const checkout = async ({userId, address}: Checkout)=>{
    if(!address){
        return {data: "Product Not found", statusCode: 400}
    }
    const cart = await getActiveCartForUser({userId})

    const orderItems: IOrderItem[] = []

    // Loop cart items and create orderitems
    for(const item of cart.items){
        const product = await productModel.findById(item.product)

        if(!product){
            return {data: "Product Not found", statusCode: 400}
        }

        const orderItem: IOrderItem = {
            productTitle: product.title,
            productImage: product.image,
            quantity: item.quantity,
            unitPrice: item.unitPrice
        }

        orderItems.push(orderItem)
    }

    const order = await orderModel.create({
        orderItems,
        total: cart.totalAmount,
        address,
        userId
    })

    await order.save()
    // update the cart status to be compeleted
    cart.status = "compeleted"
    await order.save()

    return {data: order, statusCode: 200}
}