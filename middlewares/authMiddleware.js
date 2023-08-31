
const jwt = require('jsonwebtoken');
const BlackListModel = require('../models/blackListModel');
require('dotenv').config();

const authMiddleware = async(req,res,next) => {
    const token = req.headers.authorization?.split(' ')[1];

    if(token === undefined){
        return res.status(400).send({'msg' : 'Token not found'});
    }

    const blacklistedUser = await BlackListModel.findOne({token});
    if(blacklistedUser){
        return res.status(400).send({'msg' : 'Token Revoked'})
    }

    jwt.verify(token, process.env.secretKey, (err, decoded) => {
        if(decoded){
            req.userId = decoded.userId;
            req.name = decoded.name;
            next()
        }
        else{
            res.status(400).send({'msg' : 'Invalid token'});
        }
    })
}

module.exports = authMiddleware;