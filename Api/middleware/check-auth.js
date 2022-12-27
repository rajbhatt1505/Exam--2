const jwt = require('jsonwebtoken')
const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
app.use(cookieParser())
module.exports = (req,res,next)=>{
  try{
      const token =  req.cookies.token
    //   return res.json(token);
    console.log(req.cookies.token);
    const decode = jwt.verify(token, "webBatch")
    req.userData = decode;   
    // return res.json(decode);
    next();
  }catch(error){
    res.json({success:false, message:error})
  }
}