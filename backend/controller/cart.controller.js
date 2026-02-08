import Cart from "../models/cart.model.js"


export const editItem = async (req, res) => {
    try {
        const { _id: buyerId } = req.user;
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: "Please provide an items array",
            });
        }

        let cart = await Cart.findOne({ buyer: buyerId });

        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        items.forEach(newItem => {
            const existingItem = cart.items.find(item => item.crop.toString() === newItem.crop);
            if (existingItem) {
                // Set the quantity directly instead of incrementing
                existingItem.cartQty = newItem.cartQty;
            } else {
                cart.items.push(newItem);
            }
        });

        await cart.save();
        await cart.populate("items.crop");
        return res.status(200).json({ success: true, message: "Cart Updated Successfully", items: cart.items });

    } catch (error) {
        console.log("Error in Cart Controller (editItem): ", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}



export const addItem = async (req, res) => {
    try {
        const { _id: buyerId } = req.user;
        const { items } = req.body;

        if (!items || !Array.isArray(items)) {
            return res.status(400).json({
                success: false,
                message: "Please provide an items array",
            });
        }

        let cart = await Cart.findOne({ buyer: buyerId });

        if (cart) {
            items.forEach(newItem => {
                const existingItem = cart.items.find(item => item.crop.toString() === newItem.crop);
                if (existingItem) {
                    existingItem.cartQty += newItem.cartQty;
                } else {
                    cart.items.push(newItem);
                }
            });
            await cart.save();
            await cart.populate("items.crop");
            return res.status(200).json({ success: true, message: "Cart Updated Successfuly", items: cart.items });
        }

        const newCart = await Cart.create({ buyer: buyerId, items });
        await newCart.populate("items.crop");
        res.status(201).json({ success: true, message: "Item Added Successfuly", items: newCart.items });

    } catch (error) {
        console.log("Error in Cart Controller (addItem): ", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const deleteItem = async (req, res) => {
    const { _id: buyerId } = req.user;
    const { itemId } = req.params;

    try {
        const cart = await Cart.findOne({ buyer: buyerId });
        if (!cart) {
            return res.status(404).json({ success: false, message: "Cart not found" });
        }

        const initialLength = cart.items.length;
        cart.items = cart.items.filter(item =>
            item._id.toString() !== itemId && item.crop.toString() !== itemId
        );

        if (cart.items.length === initialLength) {
            return res.status(404).json({ success: false, message: "Item not found in cart" });
        }

        await cart.save();
        await cart.populate("items.crop");

        res.status(200).json({ success: true, message: "Item Deleted Successfuly", items: cart.items });
    } catch (error) {
        console.log("Error in Cart Controller (deleteItem): ", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

export const getItems = async (req, res) => {
    const buyerId = req.params.id;

    try {
        const cart = await Cart.findOne({ buyer: buyerId }).populate("items.crop");

        if (!cart) {
            return res.status(200).json({ success: true, items: [] });
        }

        res.status(200).json({ success: true, message: "Items Fetched Successfully", items: cart.items });

    } catch (error) {
        console.log("Error in Cart Controller (getItems): ", error.message);
        return res.status(500).json({ success: false, message: error.message });
    }
}

