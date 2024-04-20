import React, {useState, useEffect} from "react";
import{Link} from "react-router-dom";
import  useCategory  from "../hooks/useCategory";

const Categories = () => {
    const categories = useCategory();
    return (
        <div className="min-h-screen m-2">
            <div>
                <h1>All Categories</h1>
            </div>
            <div>
                <div className="grid grid-cols-2">
                {categories.map((category, index) => (
                    <div key={index} >
                        <button className="p-2 m-2 bg-pink-100 rounded-md flex">
                            <Link to={`/category/:${category.slug}`}>
                            {((category.name).charAt(0).toUpperCase() + (category.name).slice(1))}
                            </Link>
                        </button>
                    </div>
                ))}
                </div>
            </div>
        </div>
    )
}

export default Categories;