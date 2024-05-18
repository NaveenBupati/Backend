
const firmModel = require("../model/Firm.js")
const Vendor = require("../model/Vendor.js")
const multer = require("multer")
const path = require("path")


const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({ storage: storage });

  const addFirm = async (req, res) => {
    try {
        console.log("Vendor ID:", req.vendorId.user.id);
        const { firmName, area, category, region, offer } = req.body;

        const image = req.file ? req.file.filename : undefined;
        console.log(image)

        const vendor = await Vendor.findById(req.vendorId.user.id);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }
        if (vendor.firm.length > 0) {
            return res.status(400).json({ message: "vendor can have only one firm" });
        }

        const firm = new firmModel({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor : vendor.id
        });

        const savedFirm = await firm.save();
        const firmId = savedFirm._id
        vendor.firm.push(savedFirm);
        await vendor.save();

        res.status(200).json({ message: "Firm added successfully", firmId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

 

module.exports = {addFirm : [upload.single("image"),addFirm]}
