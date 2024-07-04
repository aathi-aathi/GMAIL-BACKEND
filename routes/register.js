import express from "express"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { db } from "../mongodb/mongodb-connect.js"
import { transporter,mailOptions } from "./mail-utils.js"
 const registerRouter = express.Router()
registerRouter.post("/",async(req,res)=>{
    const userData = req.body
    const collection = db.collection("gmail_user")
    const userObj = await collection.findOne({email:userData.email})
    if(userObj){
        res.status(400).send({message:"User already exist",code:1})
    }
    else{
        bcrypt.hash(userData.password,10,async function(err,hash) {
            if(err){
                res.status(500).send({msg:"something error in your password"})
            }
            else{
                await collection.insertOne({
            ...userData,
            password:hash,
            inbox:[],
            sent:[],
            draft:[]
        })

    }});
    
              await transporter.sendMail({
                ...mailOptions,
                to:userData.email,
                subject:"Welome to Gmail",
                text: `Your account registered successfully`,
              })
           res.send({msg:"registered successfully"})
        }})

export default registerRouter