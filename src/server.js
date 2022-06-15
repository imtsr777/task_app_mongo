import express from 'express'
import mongoCon from '../utils/connections.js'
import { UserModel } from './schemes/userSchema.js'
import { AdressModel } from './schemes/adressSchema.js'
import mongoose from 'mongoose'
import { v4 as uuidv4 } from 'uuid';

const app = express()


app.use(mongoCon.main)
app.use(express.json())

app.get("/users",async(req,res)=>{
    const { search="" } = req.query

    const splited = search.split(" ")

    let lst_firstN = []
    let lst_lastN = []
    let lst_adr = []

    for(let item of splited){
        let obj_fn = {}
        let obj_ln = {}
        let obj_a = {}

        obj_fn.first_name = {
            $regex:'.*' + item + '.*',$options:'si'
        }

        obj_ln.last_name = {
            $regex:'.*' + item + '.*',$options:'si'
        }

        obj_a['adress.adress_name'] = {
            $regex:'.*' + item + '.*',$options:'si'
        }

        lst_firstN.push(obj_fn)
        lst_lastN.push(obj_ln)
        lst_adr.push(obj_a)
    }
    
    let finded = await UserModel.aggregate([
        {
            $lookup:{
                from: "adresses",
                localField: "adress_id",
                foreignField: "adress_id",
                as: "adress"
            }
        },
        { 
            $unwind : "$adress" 
        },
        {
            $match:{
                $or:lst_adr
            }
        },
        {
            $match:{
                $or:lst_firstN
            }
        },
        {
            $match:{
                $or:lst_lastN
            }
        }
    ])

    res.json(finded)
})

app.get("/adress",async(req,res)=>{
    const { search="" } = req.query

    const splited = search.split(" ")
    
    let finded = await AdressModel.find()
    
    res.json(finded)
})

app.post("/adress",(req,res)=>{

    let adress_info = req.body
    
    adress_info.adress_id = uuidv4()

    let added = AdressModel.insertMany([adress_info])

    res.json(added)
})


app.post("/users",(req,res)=>{

    let user_info = req.body

    let added = UserModel.insertMany([user_info])

    res.json(added)
})


app.listen(4000,()=>{console.log("http://localhost:4000/")})