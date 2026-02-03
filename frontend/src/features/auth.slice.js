import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    _id: "",
    name: "",
    email: "",
    role: "",
};

const authSlice = createSlice({
    name: "auth",
    initialState: INITIAL_STATE,
    reducers: {
        setAuth: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
        },
    },
});

export default authSlice.reducer;

export const { setAuth } = authSlice.actions;
