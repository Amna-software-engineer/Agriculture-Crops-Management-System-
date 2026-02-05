import { createSlice } from "@reduxjs/toolkit";

const savedorders = JSON.parse(localStorage.getItem("orderList"));
const orderSlice = createSlice({
    name: "orders",
    initialState: {orders: savedorders && savedorders  !==  "undefined" ? savedorders : []},
    reducers: {
        setOrder: (state, action) => {
           state.orders=action.payload;
           localStorage.setItem("orderList",JSON.stringify(action.payload));        
        },
    },
});

export default orderSlice.reducer;

export const { setOrder } = orderSlice.actions;
