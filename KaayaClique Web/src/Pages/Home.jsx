import React, {useState, useEffect} from "react";
import { useAuth } from "../context/authContext";
import axios from "axios";
import { Checkbox, Radio } from "antd";
import { toast } from "react-hot-toast";
import { Prices } from "../Components/Prices";
import { useNavigate } from "react-router-dom";
import { useCartContext } from "../context/CartContext";

const Home = () => {
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const [cart, setCart] = useCartContext();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    // get total products
    const getTotalProducts = async () => {
        try {
            const { data } = await axios.get('/api/v1/product/product-count');
            setTotal(data?.productCount);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get total products");
        }
    }
    // load more products
    const loadMoreProducts = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`/api/v1/product/product-per-page/${page}`);
            setLoading(false);
            setProducts([...products, ...data?.products]);
        } catch (err) {
            console.error(err.message);
            setLoading(false);
        }
    }
    useEffect(() => {
        if(page === 1) return;
        loadMoreProducts();
    }
    , [page]);
    // get all products
    const getAllProducts = async () => {
        try{
            setLoading(true);
            const {data} = await axios.get(`/api/v1/product/product-per-page/${page}`);
            setLoading(false);
            setProducts(data.products);
        } catch (error) {
            setLoading(false);
            //console.log(error);
        }
    }
    // get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/all-category');
            // //console.log("data in get all categories: ", data);
            data?.success && setCategories(data?.categories);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get categories");
        }
    }
    useEffect(() => {
        getCategories();
        getTotalProducts();
    }
    , []);
    // filter products by category
    const handleFilter = (value, id) => {
        let all = [...checked];
        if (value) {
          all.push(id);
        } else {
          all = all.filter((c) => c !== id);
        }
        setChecked(all);
      };
    // get products by category
    const getFilteredProducts = async () => {
        try {
            const { data } = await axios.post('/api/v1/product/product-filters', { checked, radio });
            setProducts(data?.products);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get products by category");
        }
    }
    useEffect(() => {
        if(!checked.length || !radio.length){ 
            getAllProducts();
           
        }
    }   
    , [checked.length, radio.length]);
    useEffect(() => {
        if(checked.length || radio.length){ 
            getFilteredProducts();
           
        }
    }   
    , [checked, radio]);
    return(
        <div className="flex justify-start text-pink-400 p-2 min-h-screen">
            {/* Category Filter */}
            <div className="p-2 m-2 w-auto border border-pink-300 font-serif rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200">
                <div className="mb-2">
                    <h5 className="text-md font-semibold ">Filter By Categories</h5>
                    {categories?.map((category) => (
                        <div className="">
                            <Checkbox key={category._id}
                                        onChange={(e) => handleFilter(e.target.checked, category._id)}>
                                {category.name}
                            </Checkbox>
                        </div>
                    ))}
                </div>
            {/* Price Filter */}
                <div className="mb-2">
                    <h5 className="text-md font-semibold ">Filter By Price</h5>
                    <Radio.Group onChange={e => setRadio(e.target.value)}>
                        
                        {Prices.map((price) => (
                            <div key={price._id}>
                                <Radio value={price.array}>
                                    {price.name}
                                </Radio>
                            </div>
                        ))} 
                        
                    </Radio.Group>
                </div>
            {/* Reset Filters */}
                <div className="mb-2">
                    <button className="bg-gradient-to-b from-blue-500 to-blue-300 text-white m-2 p-2 rounded-md"
                            onClick={() => {window.location.reload();
                                // setChecked([]);
                                // setRadio([]);
                            }}>
                        Reset Filters 
                    </button>                   
                </div>
            </div>
            <div className="flex flex-col w-full  overflow-scroll scroll-m-1  m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif max-h-screen  ">
            <div><h1 className="text-2xl font-serif font-semibold m-4 ">Welcome to KaayaClique!</h1></div>
                    <div className=" grid grid-cols-4 rounded-lg overflow-scroll">
                    {products?.map((product) => (
                        
                            <div key={product._id} className=" shadow-lg rounded-md m-2 ">
                                <div className="">
                                    <img className=" object-cover h-full w-full  " 
                                        src={`/api/v1/product/product-photo/${product._id}`}
                                       
                                        alt={""} />
                                       
                                </div>
                                <div className="px-6 py-4   w-full ">
                                    <div className="font-serif mb-2">{product.name.substring(0,20)}</div>
                                    <div className=" text-medium font-serif font-semibold mb-2">Rs. {product.price}</div>

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
                <div className="m-2 flex justify-center">
                    {products && products.length < total && (
                        <button className="bg-gradient-to-b from-blue-500 to-blue-300 text-white p-2 m-2 rounded-md"
                                onClick={(e) => {
                                    e.preventDefault();
                                    setPage(page + 1)}}>
                            {loading ? "Loading" : "Load More"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;