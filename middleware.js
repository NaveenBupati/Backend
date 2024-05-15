const jwt = require("jsonwebtoken");

module.exports = function(req,res,next){
    try{

        let token = req.headers.token
        if(!token){
            return res.status(404).json({message:"Token not found!.."})
        }

        let decoded = jwt.verify(token,process.env.SECRET_KEY);
        req.vendorId = decoded;
        next();
        
    }catch(err){
        console.log(err)
        res.status(500).json({message:"Invalid token!!"})
    }
}