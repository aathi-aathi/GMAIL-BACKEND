import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const trashRouter = express.Router()
trashRouter.put("/",async(req,res)=>{

    const data = req.body
    const inbox= await db.collection("gmail_user").findOne({email:data.toEmail,"inbox.id":data.emailId})
    
    try {
        if(inbox){
             await db.collection("gmail_user").updateOne({email:data.toEmail, "inbox.id":data.emailId},
        {$set:{"inbox.$.isDeleted":true}})}
       else{ 
        await db.collection("gmail_user").updateOne({email:data.toEmail, "sent.id":data.emailId},
        {$set:{"sent.$.isDeleted":true}})}
       
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
    res.send({msg:"put api works good"})
})
export default trashRouter;