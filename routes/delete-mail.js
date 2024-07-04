import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
const deleteMailRouter=express.Router()

deleteMailRouter.put("/",async(req,res)=>{
    const userData = req.body
    const inbox= await db.collection("gmail_user").findOne({email:userData.toEmail,"inbox.id":userData.emailId})
    const sent= await db.collection("gmail_user").findOne({email:userData.toEmail,"sent.id":userData.emailId})
    const draft= await db.collection("gmail_user").findOne({email:userData.toEmail,"draft.id":userData.emailId})
    try {
        if(inbox){
             await db.collection("gmail_user").updateOne(
        {email:userData.toEmail},
        {$pull:{inbox:{id:userData.emailId}}}
      )
      res.send({msg:"inbox msg deleted successfully"})
        }
        else if(sent){
            await db.collection("gmail_user").updateOne(
                {email:userData.toEmail},
                {$pull:{sent:{id:userData.emailId}}}
              )
              res.send({msg:"sent msg deleted successfully"})
        }
        else if(draft){
            await db.collection("gmail_user").updateOne(
                {email:userData.toEmail},
                {$pull:{draft:{id:userData.emailId}}}
              )
              res.send({msg:"draft msg deleted successfully"})
        }
        else{
            res.send({msg:"some error occured"})
        }
        
    } catch (error) {
        res.send(error)
    }
   
})
export default deleteMailRouter;