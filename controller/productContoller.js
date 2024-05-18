 
const multer = require("multer")
const path = require("path")
const Product = require("../model/Product.js");
const Firm = require("../model/Firm.js");

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/'); // Destination folder where the uploaded images will be stored
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Generating a unique filename
    }
});

const upload = multer({storage:storage})

const addProduct = async(req,res)=>{

    try{

        const {productName,price,category,bestSeller,description} = req.body
        const image = req.file ? req.file.filename : undefined
        console.log(image)

        const firmId =  req.params.firmId;
        const firm = await Firm.findById(firmId)
        if(!firm){
            return res.ststu(404).json({message:"No firm foun!.."})
        }

        const product = new Product({
            productName,
            price,
            category,
            image,
            bestSeller,
            description,
            firm : firm.id

        })

        const savedProduct = await product.save();
        firm.product.push(savedProduct)
        await firm.save();

        res.status(200).json({savedProduct})


    }
    
    catch(err){
        console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
}

const getProductByFirm = async (req, res) => {

    try {
        const firm = await Firm.findById(req.params.firmId).populate("product");
        if (!firm || !firm.product.length) {
            return res.status(404).json({ message: "No product found" });
        }

        const products = firm.product;
        const Restaurent_Name = firm.firmName
        res.status(200).json({Restaurent_Name,products});


    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" });
    }
}


const productDelete = async(req,res)=>{
    try{

        const productId = req.params.productId
        const deleteProducts = await Product.findByIdAndDelete(productId)
        if(!deleteProducts){
            return res.ststua(404).json({message:"no product find"})
        }
        res.status(200).json({message:"Item removed sucessfully"})
    }
    catch(err){
     console.log(err)
        res.status(500).json({message:"Internal server error"})
    }
}

module.exports = {addProduct : [upload.single("image"),addProduct], getProductByFirm,productDelete}
