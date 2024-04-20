import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import AdminMenu from "../../Components/Layout/AdminMenu";

const DisplayProducts = () => {
    const [products, setProducts] = useState([]);

    // get all products
    const getProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/all-products');
            data.success && setProducts(data.products);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get products");
        }
    }
    useEffect(() => {
        getProducts();
    }
    ,[]);
    return(
        <div  className="flex  justify-center  mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif text-pink-400  px-2 py-2">
            <div className=" sm:basis-1/4  m-2" >
                <AdminMenu />
            </div>
            <div className="flex flex-col overflow-scroll scroll-m-1 sm:basis-3/4 m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif max-h-screen  ">
            <div><h1 className="text-2xl font-serif font-semibold m-4 ">Product List</h1></div>
                    <div className="flex flex-col overflow-scroll scroll-m-1 ">
                    {products?.map((product) => (
                        <Link key= {product._id} to={`/dashboard/admin/product/${product.slug}`}
                        className=" flex  m-4   shadow-lg">
                            <div key={product._id} className="flex flex-row  overflow-scroll"
                           >
                            <div className="">
                                <img className=" object-contain w-40  h-full" 
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    height={"100px"}
                                    width={"100px"}
                                    alt={""} />
                            </div>
                            <div className="px-6 py-4  overflow-scroll ">
                                <div className="font-bold text-xl mb-2">{product.name}</div>
                                <div><p className="text-gray-700 text-base">{product.description}</p></div>
                                <div className=" text-medium font-sans mb-2">Price: {product.price}</div>
                                <div className=" text-medium font-sans mb-2">Quantity: {product.quantity}</div>

                            </div>
                            {/* <div className="px-6 pt-4 pb-2">
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                            </div> */}
                        </div>
                        </Link>
                        
                    ))}
                </div>
                </div>
        </div>
    );
}

export default DisplayProducts;