require('dotenv').config();
const productdb = require('../model/productSchema.js');
const categorydb = require('../model/categorySchema.js');
const orderdb = require('../model/orderSchema.js');
const slugify = require('slugify');
const fs = require('fs');
const braintree = require('braintree');
const e = require('express');


const BRAINTREE_MERCHANT_ID = require('../config/keys.js').BRAINTREE_MERCHANT_ID;
const BRAINTREE_PUBLIC_KEY = require('../config/keys.js').BRAINTREE_PUBLIC_KEY;
const BRAINTREE_PRIVATE_KEY = require('../config/keys.js').BRAINTREE_PRIVATE_KEY;
const braintree_merchant_id = process.env.BRAINTREE_MERCHANT_ID || BRAINTREE_MERCHANT_ID;
const braintree_public_key = process.env.BRAINTREE_PUBLIC_KEY || BRAINTREE_PUBLIC_KEY;
const braintree_private_key = process.env.BRAINTREE_PRIVATE_KEY || BRAINTREE_PRIVATE_KEY;

// braintree gateway

var gateway = new braintree.BraintreeGateway({
    environment: braintree.Environment.Sandbox,
    merchantId: braintree_merchant_id,
    publicKey: braintree_public_key,
    privateKey: braintree_private_key,
  });


// create product controller
const createProductController = async (req, res) => {
    try {
        const { name, slug, price, description, category, quantity, shipping } = req.fields;
        const { photo } = req.files;

        // check if all fields are filled
       switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            case !photo && photo.size > 1000000:
                return res.status(500).send({ error: "Photo is required and should be less than 1MB" }) ;
        }
        // create new product
        const products = new productdb({...req.fields, slug:slugify(name)});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        // save product
        await products.save();

        // send response
        res.status(201).send({
            success: true, 
            message: "Product created successfully", 
            products
        });
        
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in creating product",
            error,
        });
    }
}
const getAllProductsController = async (req, res) => {
    try {
        const products = await productdb.find({})
                                .select("-photo")
                                .populate("category")
                                .limit(10)
                                .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            totalProducts: products.length,
            message: "All products",
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching products",
            error: error.message,
        });
    }
}

const getSingleProductController = async (req, res) => {
    try {
        const product = await productdb.findOne({slug: req.params.slug})
                                        .select("-photo")
                                        .populate("category");
        if(!product){
            return res.status(404).send({error: "Product not found"});
        }
        res.status(200).send({
            success: true,
            message: "Product found",
            product,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching product",
            error: error.message,
        });
    }
}

const productPhotoController = async (req, res) => {
    try {
        const product = await productdb.findById( req.params.pid).select("photo");
        // //console.log("producr: ", product);
        // res.json(product);
        if(product.photo.data){
            res.set("Content-Type", product.photo.contentType);
            return res.status(200).send(product.photo.data);
        }
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching product photo",
            error: error.message,
        });
    }
}

const deleteProductController = async (req, res) => {
    try{
        await productdb.findByIdAndDelete(req.params.pid).select("-photo");
        res.status(200).send({success: true, message: "Product deleted successfully"});

    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in deleting product",
            error: error.message,
        });
    }
}

const updateProductController = async (req, res) => {
    try {
        const { name, slug, price, description, category, quantity, shipping } = req.fields;
        const { photo } = req.files;
        //console.log("photo",photo);
        // check if all fields are filled
       switch (true) {
            case !name:
                return res.status(500).send({ error: "Name is required" });
            case !price:
                return res.status(500).send({ error: "Price is required" });
            case !description:
                return res.status(500).send({ error: "Description is required" });
            case !category:
                return res.status(500).send({ error: "Category is required" });
            case !quantity:
                return res.status(500).send({ error: "Quantity is required" });
            // case !photo :
            //     return res.status(500).send({ error: "Photo is required and should be less than 1MB" }) ;
        }
        // create new product
        const products = await productdb.findByIdAndUpdate(req.params.pid,
                                                            {...req.fields, slug:slugify(name)},
                                                            {new: true});
        if(photo){
            products.photo.data = fs.readFileSync(photo.path);
            products.photo.contentType = photo.type;
        }
        // save product
        await products.save();

        // send response
        res.status(201).send({
            success: true, 
            message: "Product updated successfully", 
            products
        });
        
    } catch (error) {
        //console.log(error); 
        res.status(501).send({
            success: false,
            message: "Something went wrong in updating product",
            error: error.message,
        });
    }
}

// product filters controller
const productFiltersController = async (req, res) => {
    try {
        const {checked, radio} = req.body;
        let arg = {}
        if(checked.length > 0){
            arg.category = checked;
        }
        if(radio.length){
            arg.price = {
                $gte: radio[0],
                $lte: radio[1]
            }
        }
        const products = await productdb.find(arg);
                                        
        res.status(200).send({
            success: true,
            message: "Product filters",
            products,
            
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching product filters",
            error: error.message,
        });
    }
}

// product count controller
const productCountController = async (req, res) => {
    try {
        const productCount = await productdb.find({}).estimatedDocumentCount();
        res.status(200).send({
            success: true,
            message: "Product count",
            productCount,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching product count",
            error: error.message,
        });
    }
}

// product per page controller
const productPerPageController = async (req, res) => {
    try {
        const page = req.params.page ? req.params.page : 1;
        const perPage = 5;
        const products = await productdb.find({})
                                        .select("-photo")
                                        .skip((page - 1) * perPage)
                                        .limit(perPage)
                                        .sort({createdAt: -1});
        res.status(200).send({
            success: true,
            message: "Products per page",
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(400).send({
            success: false,
            message: "Something went wrong in fetching products per page",
            error: error.message,
        });
    }

}

// search product controller
const searchProductController = async (req, res) => {
    try {
        const {keyword } = req.params;
        if(!keyword){
            return res.status(400).send({error: "Keyword is required"});
        }
        const products = await productdb.find({
                                            $or: [
                                                {name: {$regex: keyword, $options: 'i'}},
                                                {description: {$regex: keyword, $options: 'i'}},
                                             
                                            ]
                                        })
                                        .select("-photo");
        // res.json(products);
                                        
        res.status(200).send({
            success: true,
            message: "Search result",
            products,
        });
        // //console.log(products);
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in searching products",
            error,
        });
    }
}

// similar product controller
const similarProductController = async (req, res) => {
    try {
        const {pid, cid} = req.params;
        const products = await productdb.find({
            _id: {$ne: pid},
            category: cid
        })
        .limit(5)
        .select("-photo")
        .populate("category");
        res.status(200).send({
            success: true,
            message: "Similar products",
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching similar products",
            error: error.message,
        });
    }
}

// category wise product controller
const categoryWiseProductController = async (req, res) => {
    try {
        const slug = req.params.slug;
        //console.log("slug: ",slug);
        const category = await categorydb.findOne({slug});
        //console.log("category in controller: ",category);
        const products = await productdb.find({category})
                                        .populate("category")
                                        .select("-photo");
        res.status(200).send({
            success: true,
            message: "Category wise products",
            category,
            products,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in fetching category wise products",
            error: error.message,
        });
    }
}

// payement gateway token controller
const braintreeTokenController = async (req, res) => {
    try{
        gateway.clientToken.generate({}, (error, response) => {
            if(error){
                return res.status(500).send({error: error});
            }
            res.status(200).send(response);
            // send({token: response.clientToken})
        });
    
    } catch (error) {
        //console.log(error);
    }
}

// payment controller
const braintreePaymentsController = async (req, res) => {
    try{
       const {cart, nonce} = req.body;
        let total = 0;
        cart.map((item) => {
            total += item.price;
        });
        let newTransaction = gateway.transaction.sale({
            amount: total,
            paymentMethodNonce: nonce,
            options: {
                submitForSettlement: true
            }
        }, (error, result) => {
            if(result){
                const order = new orderdb({
                    products: cart,
                    payment: result,
                    orderedBy: req.user._id
                }).save();
                res.json({ok: true, message: "Payment successful"});
            } else {
                res.status(500).send({error: error});
            }
        });
    } catch (error) {
        //console.log(error);
    }
}

module.exports = {createProductController, 
                    getAllProductsController,
                    getSingleProductController,
                    productPhotoController,
                    deleteProductController,
                    updateProductController,
                    productFiltersController,
                    productCountController,
                    productPerPageController,
                    searchProductController,
                    similarProductController,
                    categoryWiseProductController,
                    braintreeTokenController,
                    braintreePaymentsController};