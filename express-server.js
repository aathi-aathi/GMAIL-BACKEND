import express from 'express'
import connectToDb from './mongodb/mongodb-connect.js';
import registerRouter from './routes/register.js';
import cors from 'cors'
import loginRouter from './routes/login.js';
import forgotPasswordRouter from './routes/forgot-password.js';
import resetPasswordRouter from './routes/reset-password.js';
import MailSentRouter from './routes/mail-sent.js';
import mailRouter from './routes/get-api.js';
import trashRouter from './routes/trash-api.js';
import moveInboxRouter from './routes/move-to-inbox.js';
import deleteMailRouter from './routes/delete-mail.js';
import draftRouter from './routes/draft.js';
import starredRouter from './routes/starred-mail.js';
import unstarRouter from './routes/unstar-mail.js';
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()
const server = express()
server.use(express.json())
server.use(cors())
await connectToDb()

const customMiddleware = (req,res,next)=>{
  console.log(new Date().toString(),"Handling request for",req.method,req.originalUrl)
  next()
}

const authApi = (req,res,next)=>{
  try {
  let token = req.headers['authorization']
  jwt.verify(token,process.env.JWT_SECRET)
  next()
  } catch (error) {
    res.status(403).send({message:"Unauthorized"})
  }
 
}
server.use(customMiddleware)
server.use("/user",registerRouter)
server.use("/login",loginRouter)
server.use("/forgot-password",forgotPasswordRouter)
server.use("/reset-password",resetPasswordRouter)
server.use("/mail-sent",MailSentRouter)
server.use("/mails/",authApi,mailRouter)
server.use("/trash",trashRouter)
server.use("/move-to-inbox",moveInboxRouter)
server.use("/delete-mail",deleteMailRouter)
server.use("/draft",draftRouter)
server.use("/starred",starredRouter)
server.use("/unstar",unstarRouter)
const port= 4000;
server.listen(port,()=>{
    console.log(Date().toString(),"express port : " ,port)
})