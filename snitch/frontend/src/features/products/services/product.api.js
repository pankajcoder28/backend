import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/product",
    withCredentials: true
})

export const createProduct = async (formData)=>{
    const response = await productApiInstance.post('/',formData)
    return response.data
}

export const getSellerProduct = async ()=>{
    const response = await productApiInstance.post('/getproduct')

    return response.data
}