const express = require("express")
const userRouter = express.Router()
const bcrypt = require("bcrypt");
const userModel = require("../models/userModel");
const validation = require("../middlewares/validationMiddleware");


userRouter.post("/register",validation,async(req,res)=>{
    const {email,password} = req.body;
    try {
        const newPassword = await bcrypt.hash(password,10)
        const user = await userModel.create({...req.body,password:newPassword})
        res.status(200).send({"msg":"User Registerd Successfully",user})
        return
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = userRouter