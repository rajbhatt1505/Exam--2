const mongoose = require('mongoose');
const Schema = mongoose.Schema;
let Book = new Schema({
   
    name:{
        type:String
    },
    price:{
        type:String
    },
    description:{
        type:String
    },
    quantity:{
        type:String
    }
    // Bookimage: { type: String, required: true },

  
},
{
    collection:'book'
}
) 
module.exports = mongoose.model('Book',Book)