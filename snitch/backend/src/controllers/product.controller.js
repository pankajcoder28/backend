import productModel from "../models/product.model.js"
import { uploadFile } from "../services/storage.service.js";


export const createProduct = async (req,res)=>{
    const{title , description ,priceAmount ,priceCurrency } = req.body

    const seller = req.user;

    const images = await Promise.all(req.files.map((file)=>{
        return  uploadFile({buffer: file.buffer , fileName: file.originalname})
    }))

    const product = await productModel.create({
        title, description , 
        price:{
            amount: priceAmount,
            currency: priceCurrency ||"INR"
        },
        images,
        seller: seller._id
    })
    
    res.status(200).json({
        message: 'product created successfully',
        success: true,
        product
    })
}

export const getSellerProduct = async(req,res)=>{
    const seller = req.user

    const product = await productModel.find({seller: seller._id})

    res.status(200).json({
        message: 'product fetched successfully',
        success: true,
        product
    })
}