import React, {useEffect, useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { Select } from "antd"


const { Option } = Select;

const UpdateProduct = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [categories, setCategories] = useState([]);
    // const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [id, setId] = useState("");
    // get single product
    const getProduct = async () => {
        try {
            const { data } = await axios.get(`/api/v1/product/single-product/${params.slug}`);
            //  //console.log(data);
            setName(data.product.name);
            setId(data.product._id);
            setDescription(data.product.description);   
            setPrice(data.product.price);
            setCategory(data.product.category._id);
            setQuantity(data.product.quantity);
            setShipping(data.product.shipping);
            // setPhoto(data.product.photo);
            // //console.log("product photo: ", data.product.photo);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get product");
        }
    };
    useEffect(() => {
        getProduct();
        // eslint-disable-next-line
    }, []);

    // get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/all-category');
            data?.success && setCategories(data?.categories);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get categories");
        }
    }
    useEffect(() => {
        getCategories();
    }, []);

    // update selected product
    const updateProduct = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("category", category);
            productData.append("quantity", quantity);
            // productData.append("shipping", shipping);
            // //console.log("photo: ",  photo);
            // photo && productData.append("photo", photo);
            //console.log("productData: ", productData);
            const { data } = await axios.put(`/api/v1/product/update-product/${id}`, productData);
            //console.log(data);
            if(data?.success){
                toast.success("Product updated successfully");
                navigate("/dashboard/admin/products");
               
            } else{
                toast.error(data?.message);
            }
            
        } catch (err) {
            console.error(err.message);
            toast.error("Error to update product");
        }
    }
    
    // delete category
    const deleteProduct = async (pid) => {
       
        try {
            const { data } = await axios.delete(`/api/v1/product/delete-product/${pid}`);
            if(data.success){
                toast.success(`${name} deleted successfully`);
                navigate("/dashboard/admin/products");
                // getCategories();
                
            } else{
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Error to delete product");
        }
    }

   
    return (
        <div  className="flex sm:flex-row flex-col justify-start items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
            <div className=" sm:basis-1/4  m-2" >
                <AdminMenu />
            </div>
            <div className="flex flex-col sm:basis-3/4 m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif  min-h-screen ">
                <div className="flex justify-center mt-2">
                    <h1 className="text-2xl font-serif font-semibold">Update Product</h1>
                </div>
                <div className="sm:m-2 sm:px-4 font-serif font-semibold text-gray-600">
                    Select a category
                    <Select variant={false} placeholder={"Search category"}
                            size="large"
                            showSearch
                            className="font-serif m-2 font-normal sm:w-full border border-pink-300 rounded-md sm:px-2 sm:mt-2 text-gray-800 "
                            onChange={(value) => {setCategory(value)}}
                            value={category}
                            >
                        {categories.map((cat) => (
                            <Option key={cat._id} value={cat._id}>{cat.name}</Option>
                        ))}
                        
                    </Select>
                   
                   <div>
                        <label htmlFor="product-name" className=" font-serif text-gray-600 ">
                            Product Name
                            <input type="text"
                                    name="product-name" 
                                    placeholder="Enter product name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="m-2 p-2 sm:w-full border border-pink-300 rounded-md bg-transparent text-gray-500 font-normal"
                                    
                            />
                        </label>
                   </div>
                   <div>
                        <label htmlFor="product-description" className=" font-serif text-gray-600 ">
                            Description
                            <input type="text"
                                    name="product-description" 
                                    placeholder="Enter product description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    className="m-2 p-2 sm:w-full border border-pink-300 rounded-md bg-transparent text-gray-500 font-normal"
                                    
                            />
                        </label>
                   </div>
                   <div>
                        <label htmlFor="product-price" className=" font-serif text-gray-600 ">
                            Price
                            <input type="text"
                                    name="product-price" 
                                    placeholder="Enter product price"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    className="m-2 p-2 sm:w-full border border-pink-300 rounded-md bg-transparent text-gray-500 font-normal"
                                    
                            />
                        </label>
                   </div>
                   <div>
                        <label htmlFor="product-quantity" className=" font-serif text-gray-600 ">
                            Product quantity
                            <input type="number"
                                    name="product-quantity" 
                                    placeholder="Enter product quantity"
                                    value={quantity}
                                    onChange={(e) => setQuantity(e.target.value)}
                                    className="m-2 p-2 sm:w-full border border-pink-300 rounded-md bg-transparent text-gray-500 font-normal"
                                    
                            />
                        </label>
                   </div>
                   <div>
                        <label htmlFor="product-shipping" className=" font-serif text-gray-600 ">
                            Shipping
                            <Select
                                variant={false}
                                placeholder="Select Shipping "
                                size="large"
                                showSearch
                                className="font-serif m-2 font-normal sm:w-full border border-pink-300 rounded-md sm:px-2 sm:mt-2 text-gray-800 "
                                onChange={(value) => {
                                    setShipping(value);
                                }}
                                value={shipping ? "Yes" : "No"}
                                >
                                <Option value="0">No</Option>
                                <Option value="1">Yes</Option>
                            </Select>
                            
                        </label>
                   </div>
                   <div className="flex justify-center">
                    <button
                            onClick={updateProduct}
                            className=" w-fit m-4  p-2 text-small font-semibold text-center text-white bg-gradient-to-b from-blue-500 to-blue-300 rounded-lg  focus:ring-blue-200  hover:bg-gray-800">
                                Update Product
                    </button>
                    <button 
                            className=" w-fit m-4  p-2 text-small font-semibold text-center text-white bg-gradient-to-b from-red-500 to-red-300 rounded-lg  focus:ring-blue-200  hover:bg-gray-800"
                            onClick={() =>{deleteProduct(id)}}>Delete</button>
                </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;