const CartModel = require("../models/cartModel");

const productExist = async(req,res,next) => {
    try {
        const userId = req.userId;
        const productId = req.body.id;
    
        const existingCartItem = await CartModel.findOne({ userId, id: productId });
    
        if (existingCartItem) {
          return res.status(409).send({ msg: 'Product already exists in the cart' });
        }
    
        next(); 
      } catch (error) {
        res.status(500).send({ msg: error.message});
      }
}

module.exports = productExist;