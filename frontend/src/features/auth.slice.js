import { createSlice } from "@reduxjs/toolkit";


const savedUser = JSON.parse(localStorage.getItem("currUser"));
const authSlice = createSlice({
    name: "auth",
    initialState: {currUser:  savedUser && savedUser !== "undefined" ? savedUser : []},
    reducers: {
        setAuth: (state, action) => {
         state.currUser=action.payload;
         localStorage.setItem("currUser",JSON.stringify(action.payload))
        },
    },
});

export default authSlice.reducer;

export const { setAuth } = authSlice.actions;
