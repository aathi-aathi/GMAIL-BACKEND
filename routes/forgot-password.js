import express from 'express'
import { db } from '../mongodb/mongodb-connect.js'
import jwt from 'jsonwebtoken'
import { transporter,mailOptions } from './mail-utils.js'
import dotenv from 'dotenv'
dotenv.config()
const forgotPasswordRouter = express.Router()
forgotPasswordRouter.post("/",async(req,res)=>{
    const userData = req.body
     const collection = db.collection("gmail_user")
        const userObj = await collection.findOne({email:userData.email})
    try {
       if(userObj){
        var token = jwt.sign(
            {email: userData.email },
            process.env.JWT_SECRET,
            {
              expiresIn: "15m",
            }
          );
              await transporter.sendMail({
                ...mailOptions,
                to:userData.email,
                subject:"Password reset",
                text: `To Continue, Please verify your email address ${process.env.FE_URL}/reset-password?token=${token}`,
              })
              res.send({msg:"Email sent successfully",code:1})
       }
       else{
          res.status(404).send("You are not user")
       }
    } catch (error) {
      console.log(error)
        res.status(500).send("Something went wrong")
    }
})
export default forgotPasswordRouter;