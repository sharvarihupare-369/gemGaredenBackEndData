const express = require("express")
const paymentRouter = express.Router()
const Razorpay = require("razorpay")
const crypto = require("crypto")
const authMiddleware = require("../middlewares/authMiddleware")
require("dotenv").config()

paymentRouter.post("/orders",authMiddleware,async(req,res)=>{
    try {
      const instance = new Razorpay({key_id:process.env.KEY_ID,key_secret:process.env.KEY_SECRET}) 
      const options  = {
        amount : req.body.currentprice*100,
        currency:"INR",
        receipt : crypto.randomBytes(10).toString("hex")
    } 
    instance.orders.create(options,(error,order)=>{
      if(error){
        console.log(error);
        return res.status(400).send({'msg':"Something went wrong!"})
      }
      res.status(200).send({data:order})
    })
    } catch (error) {
        res.status(400).send({"msg":'Internal Server Error!'})
    }
})


paymentRouter.post("/verify",authMiddleware,async(req,res)=>{
    try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const sign = razorpay_order_id + "|" + razorpay_payment_id
    const expectedSign = crypto.createHmac("sha256",process.env.KEY_SECRET).update(sign.toString()).digest("hex")

    if(razorpay_signature === expectedSign){
        return res.status(200).send({'msg':'Payment Verified Successfully!'})
    }else{
        return res.status(400).send({'msg':'Invalid Signature sent!'})
    }

    } catch (error) {
        res.status(400).send({"msg":'Internal Server Error!'})
    }
})

module.exports= paymentRouter;