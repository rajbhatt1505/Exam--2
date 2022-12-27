const mongoose = require("mongoose")
const schema = new mongoose.Schema({
    Username : {
        type: String,
        // unique : true,
        // required : true
    },
    displayName : {
        type: String,
        unique : false,
        // required : true
    },
    email : {
        type: String,
        unique : false,
        required : true
    },
    mobile : {
        type: String,
        unique : false,
        required : true
    },
    image :
    {
        type: String,
    },
    ImageSize :
    {
        type: String
    },
    Src:{
        type: String,
    }
    
},{timestamps:true})

module.exports =mongoose.model("Userprofiles",schema);