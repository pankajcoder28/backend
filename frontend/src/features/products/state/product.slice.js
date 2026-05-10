import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: 'product',
    initialState:{
        sellerProducts: [],
        products: []
    },
    reducers: {
        setsellerProducts: (state,action)=>{
            state.sellerProducts = action.payload
        },
        setproducts: (state , action)=>{
            state.products = action.payload
        }
    }
})

export const {setsellerProducts , setproducts} = productSlice.actions
export default productSlice.reducer 