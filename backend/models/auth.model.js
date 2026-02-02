const mongoose=require(mongoose);


const UserSchema=new mongoose.schema({
     name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: {type: String,enum:["former","admin","broker","client"], default:"client",required:true },
 status:{type: String,enum:["pending","approved"],default:"pending",required:true}
})

module.exports=mongoose.module("UserModel",UserSchema);