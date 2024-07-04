import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const starredRouter = express.Router()
starredRouter.put("/",async(req,res)=>{

    const data = req.body
    const inbox= await db.collection("gmail_user").findOne({email:data.toEmail,"inbox.id":data.emailId})
    
    try {
        if(inbox){
             await db.collection("gmail_user").updateOne({email:data.toEmail, "inbox.id":data.emailId},
        {$set:{"inbox.$.isStarred":true}})
    res.send({msg:"inbox mail starred succesfully"})
    }
       else{ 
        await db.collection("gmail_user").updateOne({email:data.toEmail, "sent.id":data.emailId},
        {$set:{"sent.$.isStarred":true}})
        res.send({msg:"sent mail starred succesfully"})
    }
       
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
})
export default starredRouter;