import React from "react";
import { useSearch } from "../context/Search";

const SearchProduct = () => {
    const [values] = useSearch();
    // //console.log("value: ",value.products);
    return (
        <div className="flex flex-col w-full  overflow-scroll scroll-m-1  m-2 p-2 sm:p-0 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif max-h-screen  ">
        <div><h1 className="text-2xl font-serif font-semibold m-4 ">Search Results</h1></div>
                <h6>
                    {values?.products.length<1 ? "No Products found" : `${values?.products.length} Product found`}
                </h6>
            <div className=" ">
                {values?.products?.map((product) => (
                    <div key={product._id} className="flex  shadow-lg rounded-md m-2 ">
                        <div className="">
                            <img className=" object-contain w-40  h-full" 
                                src={`/api/v1/product/product-photo/${product._id}`}
                                height={"100px"}
                                width={"100px"}
                                alt={""} />
                        </div>
                        <div className="px-6 py-4   w-full ">
                            <div className="font-bold text-xl mb-2">{product.name}</div>
                            <div className=" text-medium font-sans mb-2">Price: Rs. {product.price}</div>
                            <div className="">
                                <button className="  bg-gradient-to-b from-blue-500 to-blue-300 text-white p-2 m-2 rounded-md">
                                    More Details
                                </button>
                                <button className="  bg-gradient-to-b from-amber-500 to-amber-300 text-white p-2 m-2 rounded-md">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* <div className="m-2 flex justify-center">
                {value?.products && value?.products.length < total && (
                    <button className="bg-gradient-to-b from-blue-500 to-blue-300 text-white p-2 m-2 rounded-md"
                            onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1)}}>
                        {loading ? "Loading" : "Load More"}
                    </button>
                )}
            </div> */}
        </div>
    )
}

export default SearchProduct;