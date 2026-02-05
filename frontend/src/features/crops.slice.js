import { createSlice } from "@reduxjs/toolkit";

const INITIAL_STATE = {
    _id: "",
    name: "",
    type: "",
    quantity: "",
    price: "",
    location: "",
    status: "",
    formerId: "",
    imgURL: ""
};

const cropSlice = createSlice({
    name: "crop",
    initialState: INITIAL_STATE,
    reducers: {
        setCrops: (state, action) => {
            state.id = action.payload._id;
            state.type = action.payload.type;
            state.quantity = action.payload.quantity;
            state.price = action.payload.price;
            state.location = action.payload.location;
            state.status = action.payload.status;
            state.formerId = action.payload.formerId;
            state.imgURL = action.payload.imgURL;
           
        },
    },
});

export default cropSlice.reducer;

export const { setCrops } = cropSlice.actions;
