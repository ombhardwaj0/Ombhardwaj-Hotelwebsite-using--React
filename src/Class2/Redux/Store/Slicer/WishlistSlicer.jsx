import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify';
const initialState=[]
export const WishlistSlicer = createSlice({
    name:"wishlist",
    initialState,
    reducers:{
        addToWish(state,action){
            let hotelExists=state.find((el)=>el.id===action.payload.id)
            if(hotelExists){
                 toast.success("Hotel Already Exist ")
                return state;
             }
            state.push(action.payload)
        },
        removeFromWish(state,action){
             return state.filter((el)=>el.id!==action.payload)
        }
    }
})
export const { addToWish, removeFromWish } =WishlistSlicer.actions



export default WishlistSlicer.reducer