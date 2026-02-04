import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    name:"", email:"", role:"", status:""
};

const UserSlice = createSlice({
    name: "orders",
    initialState: INITIAL_STATE,
    reducers: {
        setUser: (state, action) => {
            state._id = action.payload._id;
            state.name = action.payload.name;
            state.email = action.payload.email;
            state.role = action.payload.role;
            state.status = action.payload.status;
           
        },
    },
});

export default UserSlice.reducer;

export const { setUser } = UserSlice.actions;
