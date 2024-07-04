import express from "express"
import { db } from "../mongodb/mongodb-connect.js"

const MailSentRouter = express.Router()
 MailSentRouter.post("/",async(req,res)=>{
   const userData = req.body
   const  mailMatch  = await db.collection("gmail_user").findOne({email:userData.to})
    if(mailMatch){
     const userName =mailMatch.name
      const senderData = await db.collection("gmail_user").findOne({email:userData.from})
      await db.collection("gmail_user").updateOne(
        {email:userData.from},
        {$push:{sent:{...userData,recieverName:userName,isDeleted:false,isStarred:false,id:Date.now()}}}
      )
      await db.collection("gmail_user").updateOne(
        {email:userData.to},
        {$push:{inbox:{...userData,senderName:senderData.name,isDeleted:false,isStarred:false,id:Date.now()}}}
        
      );
      res.send({msg:"Mail sent successfully"})
     }
    else{
        res.status(404).send("email not found")
    }
 })
 export default MailSentRouter