const mongoose = require("mongoose")

const cartSchema = new mongoose.Schema({
   userId : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
   src1 : {type:String,required:true},
   src2 : {type:String,required:true},
   tag:{type:String},
   currentprice:{type:Number,required:true},
   orignalprice:{type:Number},
   name : {type:String,required:true},
   material : {type:String,required:true},
   video : {type:String,required:true},
   src3 : {type:String,required:true},
   id : {type:Number},
   quantity : {type:Number,default:1}
})

const CartModel = mongoose.model("cart",cartSchema)

module.exports = CartModel;