const firmModel = require("../model/Firm.js");
const Vendor = require("../model/Vendor.js");
const multer = require("multer");
const path = require("path");

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
        // Ensure vendor authentication
        const vendorId = req.vendorId.user.id;
        const vendor = await Vendor.findById(vendorId);

        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" });
        }

        // Check if file was uploaded
        const image = req.file ? req.file.filename : undefined;

        // Extract form data
        const { firmName, area, category, region, offer } = req.body;

        // Create and save firm
        const firm = new firmModel({
            firmName,
            area,
            category,
            region,
            offer,
            image,
            vendor: vendorId // Assign vendor ID directly
        });

        const savedFirm = await firm.save();
        
        // Update vendor's firm list
        vendor.firm.push(savedFirm);
        await vendor.save();

        res.status(200).json({ message: "Firm added successfully", savedFirm });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { addFirm: [upload.single("image"), addFirm] };
