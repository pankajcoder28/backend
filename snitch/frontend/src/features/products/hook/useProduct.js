import { useDispatch } from "react-redux";
import {createProduct,getSellerProduct} from '../services/product.api.js'
import { setsellerProducts } from "../state/product.slice.js";

export const useProduct = ()=>{
    const dispatch = useDispatch()

    async function handleCreateProduct(formData){
        const data = await createProduct(formData)
        return data.product
    }

    async function handleGetSellerProduct(){

        const data = await getSellerProduct();
        dispatch(setsellerProducts(data.product))
        return data.product
    }

    return{ handleCreateProduct, handleGetSellerProduct }
}