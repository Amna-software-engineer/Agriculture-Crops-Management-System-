import { createSlice } from "@reduxjs/toolkit";

const getInitialCart = () => {
    try {
        const savedCart = localStorage.getItem("cart");
        if (!savedCart || savedCart === "undefined") return [];
        return JSON.parse(savedCart);
    } catch (error) {
        console.error("Error parsing cart from localStorage:", error);
        return [];
    }
};

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: getInitialCart(),
        isLoading: false
    },
    reducers: {
        setCartFromBackend: (state, action) => {
            state.items = action.payload || [];
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        addItems: (state, action) => {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.crop?._id === newItem.crop?._id);

            if (existingItem) {
                existingItem.cartQty += 1;
            } else {
                state.items.push(newItem);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        deleteItem: (state, action) => {
            const itemId = action.payload;
            state.items = state.items.filter(item => item.crop?._id !== itemId);
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        increaseQty: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(item => item.crop?._id === itemId);
            if (item) {
                item.cartQty += 1;
                localStorage.setItem("cart", JSON.stringify(state.items));
            }
        },

        decreaseQty: (state, action) => {
            const itemId = action.payload;
            const item = state.items.find(item => item.crop?._id === itemId);

            if (item && item.cartQty > 1) {
                item.cartQty -= 1;
            } else {
                state.items = state.items.filter(i => i.crop?._id !== itemId);
            }
            localStorage.setItem("cart", JSON.stringify(state.items));
        },

        clearCart: (state) => {
            state.items = [];
            localStorage.removeItem("cart");
        }
    },
});

export default cartSlice.reducer;
export const { addItems, decreaseQty, increaseQty, setCartFromBackend, deleteItem, clearCart } = cartSlice.actions;