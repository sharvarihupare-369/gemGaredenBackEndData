const userModel = require("../models/userModel")

const validation = async(req,res) => {
   const {email,password} = req.body

   if(password.length < 8){
    return res.status(400).send({"msg":"Password must be at least of 8 characters!"})
   }
   
   if(!/\d/.test(password)){
    return res.status(400).send({"msg":"Password must contain a number!"})
   }

   if(!/[A-Z]/.test(password)){
    return res.status(400).send({"msg":"Password must contain an uppercase character!"})
   }

   if(!/[!@#$%^&*]/.test(password)){
    return res.status(400).send({"msg":"Password must contain a special character!"})
   }

   const existUser = await userModel.findOne({email})

   if(existUser){
    return res.status(400).send({"msg":"User Already Exists!"})
   }

}

module.exports = validation