import { createSlice } from "@reduxjs/toolkit";

const savedCrops = JSON.parse(localStorage.getItem("cropsList"));

const cropSlice = createSlice({
    name: "crops",
    initialState: { crops: savedCrops && savedCrops !== "undefined" ? savedCrops : [] },
    reducers: {
        setCrops: (state, action) => {
            state.crops = action.payload;
            localStorage.setItem("orderList", JSON.stringify(action.payload));
        },
    },
});

export default cropSlice.reducer;

export const { setCrops } = cropSlice.actions;
