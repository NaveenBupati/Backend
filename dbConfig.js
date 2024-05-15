const mongoose = require("mongoose");
const dotEnv = require("dotenv")





dotEnv.config();

mongoose.connect(process.env.MONGO_URI);


const db = mongoose.connection;


//event handlers to handle databse connections

db.on("connected",()=>{
    console.log("Mongodb connected sucessfully...")
})

db.on("Error",(error)=>{
    console.log("Error in connecting Mongodb database :" ,error)
})

db.on("disconnected",()=>{
    console.log("Mongodb disconnected sucessfully...")
})


module.exports = db;