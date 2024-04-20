require('dotenv').config();
const authdb = require('../model/authSchema.js');
const orderdb = require('../model/orderSchema.js');
const {hashPassword, comparePassword} = require('../helpers/authHelper');
const JWT = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || require('../config/keys.js').JWT_SECRET;

// register controller
const registerController = async (req, res) => {
    try {
        const { name, email, password, phone , address} = req.body;
        if (!name || !email || !password || !phone || !address) {
            return res.send({ message: "Please fill all the fields" });
        }
        // check if user already exists
        const user = await authdb.findOne({ email });
        if (user) {
            return res.status(200).send({
                succcess: false,
                message: "User already exists. Please login!",
            });
        }
        // hash the password
        const hashedPassword = await hashPassword(password);
        // create new user
        const newUser = await new authdb({
            name,
            email,
            phone,
            address,
            password: hashedPassword,
        });
        await newUser.save();
        
        res.status(201).send({
            success: true,
            message: "User registered successfully",
            newUser,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in registration",
            error,
        });
    }
}

// login controller
const loginController = async (req, res) => {
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return res.status(404).send({
                success: false,
                message: "Please fill all the fields"
            });
        }
        const user = await authdb.findOne({email});
        if(!user){
            return res.status(404).send({
                success: false,
                message: "User not found. Please register!",
            });
        }
        const isMatch = await comparePassword(password, user.password);
        if(!isMatch){
            return res.status(200).send({
                success: false,
                message: "Invalid password. Please try again!",
            });
        }
        const token = JWT.sign({_id: user._id}, JWT_SECRET, {expiresIn: "7d"});
        res.status(200).send({
            success: true,
            message: "User logged in successfully",
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role,
            },
            token
        });
    }
    catch(err){
        //console.log(err);
        res.status(500).send({
            success: false,
            message: "Something went wrong in login",
            err
        });
    }
}

// test controller
const testController = (req, res) => {
    res.send("protected router");
}

// update profile controller
const updateProfileController = async (req, res) => {
    try {
        const { name, email, phone, address, password } = req.body;
        const user = await authdb.findById(req.user._id);
        // if (name) user.name = name;
        // if (email) user.email = email;
        if (password && password.length < 6) {
            return res.json({ error: "Passsword is required and 6 character long" });
          }
        const hashedPassword = password ? await hashPassword(password) : undefined;
        const updatedUser = await authdb.findByIdAndUpdate(req.user._id,{
            name: name || user.name,
            phone: phone || user.phone,
            address: address || user.address,
            password: hashedPassword || user.password,
        }, {new: true});  
        await updatedUser.save();
        res.status(200).send({
            success: true,
            message: "Profile updated successfully",
            updatedUser: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
            }
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in updating profile",
            error
        });
    }
}

// get orders controller
const getOrdersController = async (req, res) => {
    try {
        //console.log("req.user: ", req.user)
        const orders = await orderdb.find({orderedBy: req.user._id})
                                    .populate("products", "-photo ")
                                    .populate("orderedBy", "name");
        res.json(orders);
        
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching orders",
            error
        });
    }
}

// get all orders controller
const getAllOrdersController = async (req, res) => {
    //console.log("all orders req.user: ", req.user)
    try {
        const orders = await orderdb.find({})
                                    .populate("products", "-photo")
                                    .populate("orderedBy", "name")
                                    .sort("-createdAt");
        res.json(orders);
        
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching orders",
            error
        });
    }
}
// order status controller
const orderStatusController = async (req, res) => {
    try {
        const {orderId} = req.params;
        const {orderStatus } = req.body;
        const orders = await orderdb.findByIdAndUpdate
        (orderId, {orderStatus}, {new: true});
        res.json(orders);    
    }
    catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in updating order status",
            error
        });
    }
}
module.exports = {registerController, 
                    loginController, 
                    testController, 
                    updateProfileController,
                    getOrdersController,
                    getAllOrdersController,
                    orderStatusController};
    