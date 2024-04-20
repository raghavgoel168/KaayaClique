import React, {useState, useEffect}from "react";
import { useSearch } from "../../context/Search";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SearchInput = () => {

    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const {data} = await axios.get(`/api/v1/product/search/${values.keyword}`);
            setValues({...values, products: data.products});
            navigate("/search");
        } catch (error) {
            //console.log(error);
        }
    }
    return (
        <div>
            <form className="w-auto mx-auto " onSubmit={handleSubmit}>   
                <div className="relative">
                    
                    <input 
                        type="search" 
                        id="default-search" 
                        className="block w-full p-4  ps-4 text-sm text-gray-900 border border-pink-30 rounded-lg bg-pink-50     " 
                        placeholder="Search Products"
                        value={values.keyword}
                        onChange={(e) => setValues({...values, keyword: e.target.value})} 
                    />
                    {/* <div className="absolute inset-y-0 end-4  flex items-center ps-3 pointer-events-none">
                        <button type="submit" className="text-white absolute -end-1.5 bottom-2.5 bg-pink-300 hover:bg-pink-400 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm ml-2 p-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            <svg className="w-4 h-4 text-white dark:text-gray-400  focus:ring-2 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                            </svg>
                        </button>
                    </div> */}
                    <button type="submit" className="text-white absolute  end-2.5 bottom-2.5 bg-pink-400 hover:bg-pink-300 focus:ring-2 focus:outline-none  font-medium rounded-lg text-sm ml-2 p-2  ">Search</button>
                </div>
            </form>

        </div>
    )
}

export default SearchInput;