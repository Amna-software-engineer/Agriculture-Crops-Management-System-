import { createSlice } from "@reduxjs/toolkit";

const savedorders = JSON.parse(localStorage.getItem("orderList"));
const orderSlice = createSlice({
    name: "orders",
    initialState: { orders: savedorders && savedorders !== "undefined" ? savedorders : [] },
    reducers: {
        setOrder: (state, action) => {
            state.orders = action.payload;
            localStorage.setItem("orderList", JSON.stringify(action.payload));
        },
        removeOrderFromStore: (state, action) => {
            state.orders = state.orders.filter(order => order._id !== action.payload);
            localStorage.setItem("orderList", JSON.stringify(state.orders));
        },
    },
});

export default orderSlice.reducer;

export const { setOrder, removeOrderFromStore } = orderSlice.actions;
