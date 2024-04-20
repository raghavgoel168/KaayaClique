const categorydb = require('../model/categorySchema.js');
const slugify = require('slugify');

const categoryController = async (req, res) => {
    try {
        const { name, slug } = req.body;

        // check if all fields are filled
        if (!name) {
            return res.status(401).send({ message: "Please fill all the fields" });
        }

        // check if category already exists
        const category = await categorydb.findOne({ name });
        if (category) {
            return res.status(200).send({
                success: true,
                message: "Category already exists",
            });
        }

        // if category does not exist, create new category
        const newCategory = await new categorydb({
            name,
            slug: slugify(name),
        })
        .save();

        // send response
        res.status(201).send({
            success: true,
            message: "Category created successfully",
            newCategory,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in creating category",
            error,
        });
    }
}

const updateCategoryController = async (req, res) => {
    try {
        const {name} = req.body;
        const {id} = req.params;
       const category = await categorydb.findByIdAndUpdate(id, {name, slug: slugify(name)}, {new: true});
       res.status(200).send({
           success: true,
           message: "Category updated successfully",
           category,
       });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in updating category",
            error,
        });
    }
}

const getAllCategoryController = async (req, res) => {
    try {
        const categories = await categorydb.find({});
        res.status(200).send({
            success: true,
            message: "All categories",
            categories,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in getting categories",
            error,
        });
    }
}
const getSingleCategoryController = async (req, res) => {
    try {
        
        const category = await categorydb.findOne({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: "Single category",
            category,
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in getting single category",
            error,
        });
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const {id} = req.params;
        await categorydb.findByIdAndDelete(id);
        res.status(200).send({
            success: true,
            message: "Category deleted successfully",
            
        });
    } catch (error) {
        //console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong in deleting category",
            error,
        });
    }
}

module.exports = { categoryController, updateCategoryController,
                    getAllCategoryController, getSingleCategoryController,
                    deleteCategoryController};
