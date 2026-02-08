import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth.slice";
import CropReducer from "./features/crops.slice"
import OrderReducer from "./features/order.slice"
import UserReducer from "./features/user.slice"
import CartReducer from "./features/cart.slice"

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
        crops:CropReducer,
        orders:OrderReducer,
        users: UserReducer,
        cart: CartReducer
    },
});
