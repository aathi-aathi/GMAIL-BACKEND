import  express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const unstarRouter = express.Router()
unstarRouter.put("/",async(req,res)=>{
    const data = req.body
    const inbox= await db.collection("gmail_user").findOne({email:data.toEmail,"inbox.id":data.emailId})
    const sent= await db.collection("gmail_user").findOne({email:data.toEmail,"sent.id":data.emailId})
    try {
        if(inbox){
             await db.collection("gmail_user").updateOne({email:data.toEmail, "inbox.id":data.emailId},
        {$set:{"inbox.$.isStarred":false}})
        res.send({msg:"inbox: unstar  successfuly"})
    }
       else if(sent){ 
        await db.collection("gmail_user").updateOne({email:data.toEmail, "sent.id":data.emailId},
        {$set:{"sent.$.isStarred":false}})
        res.send({msg:"sent: unstar successfuly"})
    }
       else{
        res.send({msg:"someerror occured"})
       }
    } catch (error) {
        res.status(500).send({msg:"Something went wrong"})
    }
  
})
export default unstarRouter;