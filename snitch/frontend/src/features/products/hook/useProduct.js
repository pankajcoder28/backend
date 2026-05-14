import { useDispatch } from "react-redux";
import {createProduct,getAllProduct,getSellerProduct,getProductById} from '../services/product.api.js'
import { setsellerProducts,setproducts } from "../state/product.slice.js";

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

    async function handleGetAllProducts(){
        const data = await getAllProduct();
        dispatch(setproducts(data.product))
        return data.product
    }

    async function handleGetProductById(productId){
        const data = await getProductById(productId);
        return data.product
    }

    return{ handleCreateProduct, handleGetSellerProduct , handleGetAllProducts , handleGetProductById }
}
