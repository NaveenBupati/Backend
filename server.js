const express = require("express")
const bodyParser = require("body-parser")
const dotEnv = require("dotenv")
const app = express();
const PORT = process.env.PORT || 8080
const dbConfig = require("./dbConfig.js")
const vendorRoutes = require("./routes/vendorRoutes.js")
const firmRoutes = require("./routes/firmRoutes.js")
const productRoutes = require("./routes/productRoutes.js")
const cors = require("cors");
const path = require("path")




app.use(bodyParser.json());
app.use(cors())

app.use("/vendor",vendorRoutes)
app.use("/firm",firmRoutes)
app.use("/product",productRoutes)
app.use("/uploads",express.static("uploads"))

app.listen(PORT,()=>{
    console.log(`server running on a ${PORT} port...`)
})

app.get("/",(req,res)=>{
    res.send("<center><h1>Hello welcome to Backend Website..</h1></center>")
})