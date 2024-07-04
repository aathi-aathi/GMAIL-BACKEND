import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const draftRouter=express.Router()
 draftRouter.post("/",async(req,res)=>{
  const userData = req.body
    try {
        await db.collection("gmail_user").updateOne(
            {email:userData.from},
            {$push:{draft:{...userData,isDeleted:false,id:Date.now()}}}
          )
          res.send({msg:"draft created successfully"})
    } catch (error) {
        res.send(error)
    }
 })
 export default draftRouter;