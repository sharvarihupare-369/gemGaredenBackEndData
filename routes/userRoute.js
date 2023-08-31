const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt");
const validation = require("../middlewares/validationMiddleware");
const jwt = require("jsonwebtoken");
const BlackListModel = require("../models/blackListModel");
const UserModel = require("../models/userModel");

require("dotenv").config()

userRouter.post("/register",validation,async(req,res)=>{
    const {email,password} = req.body;
    try {
        const newPassword = await bcrypt.hash(password,10)
        const user = await UserModel.create({...req.body,password:newPassword})
        res.status(200).send({"msg":"User Registerd Successfully",user})
        return
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(!user){
           return   res.status(400).send("Invalid credentials")
        }

        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            res.status(400).send("Invalid credentials")
        }else{
            const token = jwt.sign({userId:user._id,name:user.firstname},process.env.secretKey,{expiresIn:"7hr"})
            // const refreshToken = jwt.sign({email},process.env.refreshKey,{expiresIn:"3d"})
            return res.status(200).send({msg:"User logged in successfully",token,user:`${user.firstname} ${user.lastname}`})
        }

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})


userRouter.get("/logout",async(req,res)=>{
    const token = req.headers.authorization.split(" ")[1]
    if(!token){
      return  res.status(400).send("Login First!")
    }
   
    try {
        const blackList = await BlackListModel.create({token})
        res.status(200).send("User Logged out")
        return
    } catch (error) {
        res.status(400).send({ msg: error.message });  
    }

})

module.exports = userRouter