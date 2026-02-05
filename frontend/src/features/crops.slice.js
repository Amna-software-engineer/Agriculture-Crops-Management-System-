import { createSlice } from "@reduxjs/toolkit";

const savedCrops = JSON.parse(localStorage.getItem("cropsList"));

const cropSlice = createSlice({
    name: "crops",
    initialState: {crops: savedCrops && savedCrops  !==  "undefined" ? savedCrops : []},
    reducers: {
        setCrops: (state, action) => {
            console.log("setCrops", action.payload);
            
            state.crops=action.payload;
             localStorage.setItem("cropsList", JSON.stringify(action.payload));
        },
    },
});

export default cropSlice.reducer;

export const { setCrops } = cropSlice.actions;
