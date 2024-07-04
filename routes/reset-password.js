import jwt from "jsonwebtoken";
import express from "express";
import bcrypt from 'bcrypt'
import { db } from "../mongodb/mongodb-connect.js"
const resetPasswordRouter = express.Router();

resetPasswordRouter.post("/", async (req, res) => {
  const {token} = req.body;
  const userData = req.body
  const password = userData.password
  const collection = db.collection("gmail_user")
  try {
    const data = jwt.verify(token, process.env.JWT_SECRET);
    bcrypt.hash(password,10,async function(err, hash) {
      if(err){
          res.status(500).send({msg:"something error in your password"})
      }
      else{
        await collection.updateOne(
      { email: data.email},
      {
        $set: { password:hash},
      }
    );
  }});
    res.send({ msg: "User verified Successfully", code: 1 });
  } catch (err) {
    console.log(err);
    res.status(403).send({ msg: "Failed User Verification", code: -1 });
  }
});

export default resetPasswordRouter;