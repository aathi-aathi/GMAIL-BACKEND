import express from "express"
import { db } from "../mongodb/mongodb-connect.js"

const mailRouter = express.Router()

mailRouter.get("/:emailId",async(req,res)=>{
          const {emailId}=req.params
          console.log(emailId)
    const data = await db.collection("gmail_user").findOne({email:emailId})
    res.send(data)
})
export default mailRouter;