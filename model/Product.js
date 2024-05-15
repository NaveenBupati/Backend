const mongoose = require("mongoose");



const productsSchema  =  new mongoose.Schema({
    productName:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    category: {
        type: [
            {
                type:String,
                enum : ["Veg","Non-veg"]
            }
            ]
    },
    image:{
        type:String
    },
    bestSeller:{
        type:String
    },description:{
        type:String
    },
    firm : [
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"firm"
        }
    ]
})


module.exports = mongoose.model("Product",productsSchema)