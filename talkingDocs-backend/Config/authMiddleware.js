const User = require("../Model/user");
const jwt = require("jsonwebtoken");

const protectUser = async(req,res, next) => {
    try {
        const token = req.cookies.token;
        if(!token){
            return res.status(401).json({message:"Not Authorised, Please log in."});
        }

        // verify token validity
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from token
        const user = await User.findById(verified.id).select("-password");
        if(!user){
            return res.status(401).json({message:"User not found."});
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({message:"Not Authorised, Please log in."});
    }
}

module.exports = protectUser;