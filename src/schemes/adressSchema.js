import mongoose from "mongoose"

const adressSchema = new mongoose.Schema({
    adress_name:String,
    adress_id:String,
},{ _id: false})

export const AdressModel = mongoose.model("Adress",adressSchema)
