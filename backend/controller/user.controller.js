import User from "../models/auth.model.js";


export const getUser =async (req,res) => {
    try {
        const allUsers = await User.find();
        res.status(200).json({ success: true, message: "User featched Succesfuly", allUsers });
    } catch (error) {
        console.log("Error in User Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const getSingleUser =async (req,res) => {
          const  id  = req.params.id;
    try {
        const singleUser = await User.findById(id);
        console.log("singleUser",singleUser);
        res.status(200).json({ success: true, message: "User featched Succesfuly", singleUser });
    } catch (error) {
        console.log("Error in User Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const deleteUser =async (req,res) => {
     const  id  = req.params.id;
     try {
        const deletedUser = await User.findByIdAndDelete(id);
        console.log("deletedUser",deletedUser);
        
        res.status(200).json({ success: true, message: "User deleted Succesfuly", deletedUser });
    } catch (error) {
        console.log("Error in User Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}
export const editUser =async (req,res) => {   
     const id = req.params.id;
     const { name, role ,status} = req.body;
     
     try {
        const updatedUser = await User.findByIdAndUpdate(id, { name, role ,status });
        res.status(200).json({ success: true, message: "User updated Succesfuly", updatedUser });
    } catch (error) {
        console.log("Error in User Controller : ", error.message);
        return res.status(500).json({
            success: false,
            error,
        });
    }
}