import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    buyer:"", crop:"", quantity:"", totalPrice:"", status:"", shippingAddress:""
};

const orderSlice = createSlice({
    name: "orders",
    initialState: INITIAL_STATE,
    reducers: {
        setOrder: (state, action) => {
            state._id = action.payload._id;
            state.buyer = action.payload.buyer;
            state.crop = action.payload.crop;
            state.quantity = action.payload.quantity;
            state.totalPrice = action.payload.totalPrice;
            state.status = action.payload.status;
            state.shippingAddress = action.payload.shippingAddress;
           
        },
    },
});

export default orderSlice.reducer;

export const { setOrder } = orderSlice.actions;
