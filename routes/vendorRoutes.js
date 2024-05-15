const express = require("express");
const router = express.Router();
const controller = require("../controller/VendorController.js")
const auth = require("../middleware.js")


router.post("/register",controller.vendorRegistration)

router.get("/getDetails",controller.getDetails)

router.post("/login",controller.login)

router.get("/singleVendor/:id",controller.singleVendorDetails)


module.exports = router