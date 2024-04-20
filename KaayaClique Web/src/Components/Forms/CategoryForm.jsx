import React from "react";

const CategoryForm = ({handleSubmit, value, setValue}) => {
    return(
        <div>
            <form className="flex flex-col justify-center"
                    onSubmit={handleSubmit}>
                <label htmlFor="name" className="m-2 font-serif font-semibold">Create New Category</label>
                <input type="text" name="new-category" id="new-category"
                        placeholder="Enter new category" 
                        value={value}
                        onChange={(e) => setValue(e.target.value)}
                        className="m-2 p-2 border border-gray-400 rounded-md" />
                <div className="flex justify-center">
                    <button type="submit" className=" w-fit m-4  p-2 text-small font-semibold text-center text-white bg-gradient-to-b from-blue-500 to-blue-300 rounded-lg  focus:ring-blue-200  hover:bg-gray-800"> Create Category </button>
                </div>
            </form>
        </div>
    );
}

export default CategoryForm;