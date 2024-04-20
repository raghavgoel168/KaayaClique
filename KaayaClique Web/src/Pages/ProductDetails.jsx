import React, {useState, useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";
import axios from "axios";

const ProductDetails = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCartContext();
    const [similarProducts, setSimilarProducts] = useState([]);
    const getProducts = async () => {
        try{
            const {data} = await axios.get(`/api/v1/product/single-product/${params.slug}`);
            setProduct(data?.product);
            getSimilarProducts(data?.product?._id, data?.product?.category?._id);
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(() => {
        if(params?.slug){
            getProducts();
        }
    }   
    , [params?.slug]);
    // get similar products
    const getSimilarProducts = async (pid, cid) => {
        try{
            const {data} = await axios.get(`/api/v1/product/similar-products/${pid}/${cid}`);
            setSimilarProducts(data?.products);
        } catch (error) {
            //console.log(error);
        }
    }
    return (
    <div className="flex flex-col w-full  overflow-scroll scroll-m-1  m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif min-h-screen  ">
        <div className="flex flex-col w-full  overflow-scroll scroll-m-1  m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif min-h-screen  ">
                
            <div><h1 className="text-2xl font-serif font-semibold m-4 ">{product.name} | {(product.category?.name)}</h1></div>
                
            <div className=" flex rounded-lg m-2 overflow-scroll">
                    
                    <div className="">
                        <img className=" object-cover h-full w-full  " 
                            src={`/api/v1/product/product-photo/${product._id}`}
                            
                            alt={""} />
                            
                    </div>
                    <div className="px-6 py-4   w-full ">
                        <div className="font-serif mb-2">{product.name} | {product.category?.name} </div>
                        <div className=" text-medium font-serif  mb-2">Price: Rs. {product.price} </div>
                        <div className=" text-medium font-serif  mb-2"> {product.category?.name}</div>
                        <div className=" text-medium font-serif  mb-2"> {product.description}</div>
                        <div className=" text-medium font-serif  mb-2"> Quantity: {product.quantity}</div>

                        <div className="">
                        {/* <button onClick={() => navigate(`/product/${product.slug}`)}
                                className="  bg-gradient-to-b from-blue-500 to-blue-300 text-white m-2 p-2 rounded-md">
                            More Details
                        </button> */}
                        <button  onClick={() => {
                                        setCart([...cart, product]);
                                        localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                        }}
                                className="  bg-gradient-to-b from-amber-500 to-amber-300 text-white m-2 p-2 rounded-md">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
            {/* <hr className="mr-4 ml-4 mt-2 mb-2 bg-pink-400 "/> */}
            {/* Similar Products */}
            
            <div>
                <h1 className="text-2xl font-serif font-semibold mt-8 ml-4 ">Similar Products</h1>
                {similarProducts?.length < 1 && (<div className="ml-6"><h1 className="text-center">No Similar Products Found</h1> </div>)}
                <div className=" grid grid-cols-4 rounded-lg overflow-scroll">
                    {similarProducts?.map((product) => (
                                                    
                        <div key={product._id} className=" shadow-lg rounded-md m-2 ">
                            <div className="">
                                <img className=" object-cover h-full w-full  " 
                                    src={`/api/v1/product/product-photo/${product._id}`}
                                    
                                    alt={""} />
                                    
                            </div>
                            <div className="px-6 py-4   w-full ">
                                <div className="font-serif mb-2">{product.name.substring(0,20)}</div>
                                <div className="font-serif mb-2">{product.name.substring(0,20)}...</div>
                                <div className=" text-medium font-serif font-semibold mb-2"> Rs. {product.price}</div>
                                
                                <div className="">
                                    <button onClick={() => navigate(`/product/${product.slug}`)}
                                            className="  bg-gradient-to-b from-blue-500 to-blue-300 text-white m-2 p-2 rounded-md">
                                        More Details
                                    </button>
                                    <button onClick={() => {
                                                    setCart([...cart, product]);
                                                    localStorage.setItem("cart", JSON.stringify([...cart, product]));
                                                    }}
                                            className="  bg-gradient-to-b from-amber-500 to-amber-300 text-white m-2 p-2 rounded-md">
                                                                                   
                                        Add to Cart
                                    </button>
                                </div> 
                            </div>
                        </div>
                    ))}
                    </div>
                
                
                    
            </div>
        </div>
    </div>  
    );
}
export default ProductDetails;