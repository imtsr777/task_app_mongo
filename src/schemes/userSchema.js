import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    position:String,
    department:String,
    adress_id:String
},{ _id: false})

export const UserModel = mongoose.model("User",userSchema)
