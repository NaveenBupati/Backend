const express = require("express")
const router = express.Router();
const controller = require("../controller/productContoller.js")



router.post("/addProduct/:firmId",controller.addProduct)

router.get("/firmProducts/:firmId",controller.getProductByFirm)


router.get("/uploads/:imageName",(req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent("Content-Type","image/jpeg");
    res.sendFile(path.join(__dirname,".." , "uploads",imageName))
})


router.delete("/delete/:productId",controller.productDelete)


module.exports = router;