const express = require("express")
const router = express.Router();
const firmController = require("../controller/firmController.js")
const authToken = require("../middleware.js")



router.post("/addfirm",authToken,firmController.addFirm)

router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,".." , "uploads",imageName))
})


module.exports = router