import { createSlice } from "@reduxjs/toolkit";

const savedUser = JSON.parse(localStorage.getItem("userList"));

const UserSlice = createSlice({
    name: "users",
    initialState: {
        Users: savedUser && savedUser !== "undefined" ? savedUser : []
    },
    reducers: {
        setUser: (state, action) => {
            state.Users = action.payload;
            localStorage.setItem("userList", JSON.stringify(action.payload));

        },
    },
});

export default UserSlice.reducer;

export const { setUser } = UserSlice.actions;
