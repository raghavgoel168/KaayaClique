const JWT = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || require('../config/keys').JWT_SECRET;

const authdb = require('../model/authSchema');

// login access
const requireLogin = (req, res, next) => {
    try {
        const decoded = JWT.verify(req.headers.authorization, JWT_SECRET);
        req.user = decoded;
        next();
    } catch(err) {
        //console.log(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong in login",
            err
        });
    }
}

// admin access
const requireAdmin = async (req, res, next) => {
    try {
        const user = await authdb.findById(req.user._id);
        if(user.role !== 1){
            return res.status(401).send({
                success: false,
                message: "You are not authorized to access this route"
            });
        } else{
            next();
        }
    } catch(err) {
        //console.log(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong in admin login",
            err
        });
    }
}

module.exports = {requireLogin, requireAdmin};