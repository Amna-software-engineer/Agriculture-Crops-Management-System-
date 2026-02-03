import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./features/auth.slice";

export const store = configureStore({
    reducer: {
        auth: AuthReducer,
    },
});
