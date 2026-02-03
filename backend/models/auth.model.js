import mongoose from "mongoose";
import bcryptjs from "bcryptjs";

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {type: String,enum:["former","admin","broker","client"], default:"client",required:true },
 status:{type: String,enum:["pending","approved"],default:"pending",required:true}
})

module.exports=mongoose.module("UserModel",UserSchema);
UserSchema.pre("save", async function () {
    if (this.isModified("password")) {
        this.password = await bcryptjs.hash(this.password, 10);
    }
});

const model = mongoose.model("UserModel", UserSchema);

export default model;
