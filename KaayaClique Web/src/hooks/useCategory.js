import React, { useState, useEffect } from "react";
import axios from "axios";

const useCategory = () => {

    const [categories, setCategories] = useState([]);

    // get categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/all-category');
            setCategories(data?.categories);
        } catch (error) {
            console.error("Error fetching categories: ", error);
        }
    };
    
    useEffect(() => {
        getCategories();
    }, []);
    
    return categories;
};

export default useCategory;