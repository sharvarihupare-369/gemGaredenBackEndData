const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const CartModel = require("../models/cartModel");
const productExist = require("../middlewares/productExistMiddleware");
const cartRouter = express.Router()
require("dotenv").config()


cartRouter.post("/addtocart",authMiddleware,productExist,async(req,res)=>{
      try {
        const cartproduct = await CartModel.create({...req.body,userId:req.userId})
        res.status(200).send({"msg":"Product added to Cart",cartproduct})
      } catch (error) {
        res.status(400).send({"msg":error.message})
      }
})

cartRouter.get("/",authMiddleware,async(req,res)=>{
    try {
      const cartproducts = await CartModel.find({userId:req.userId})
      res.status(200).send(cartproducts)
    } catch (error) {
      res.status(400).send({"msg":error.message})
    }
})

cartRouter.patch("/update/:id",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const id = req.params.id;
    const cartproduct = await CartModel.findOne({_id:id})
    try {

        if(userId == cartproduct.userId.toString()){
            const product = await CartModel.findByIdAndUpdate({_id:id},req.body,{new:true})
            res.status(200).send({'msg' : 'Product updated', product});
        }else{
            res.status(400).send({'msg' : 'You are not authorized to update!'})
        }

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

cartRouter.delete("/delete/:id",authMiddleware,async(req,res)=>{
    const userId = req.userId;
    const id = req.params.id;
    const cartproduct = await CartModel.findOne({_id:id})
    try {

        if(userId == cartproduct.userId.toString()){
            const product = await CartModel.findByIdAndDelete({_id:id})
            res.status(200).send({'msg' : 'Product deleted'});
        }else{
            res.status(400).send({'msg' : 'You are not authorized to delete!'})
        }

    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = cartRouter;