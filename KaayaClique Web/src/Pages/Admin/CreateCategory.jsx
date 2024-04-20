import React, {useEffect, useState} from "react";
import toast from "react-hot-toast";
import axios from "axios";
import AdminMenu from "../../Components/Layout/AdminMenu";
import CategoryForm from "../../Components/Forms/CategoryForm";
import { Modal } from "antd"
const CreateCategory = () => {
    const [category, setCategory] = useState([]);
    const [catname, setCatname] = useState("");
    const [visible, setVisible] = useState(false);
    const [selected, setSelected] = useState(null); 
    const [updatedName, setUpdatedName] = useState("");
    // get all categories
    const getCategories = async () => {
        try {
            const { data } = await axios.get('/api/v1/category/all-category');
            data.success && setCategory(data.categories);
        } catch (err) {
            console.error(err.message);
            toast.error("Error to get categories");
        }
    }
    // create new category
    const createCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/v1/category/create-category', { name: catname });
            data.success && toast.success(data.message);
            getCategories();
            setCatname("");
        } catch (err) {
            console.error(err.message);
            toast.error("Error to create category");
        }
    }

    // update category
    const updateCategory = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.put(`/api/v1/category/update-category/${selected._id}`, { name: updatedName });
            if(data.success){
                toast.success(`${updatedName} updated successfully`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getCategories();
                
            } else{
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Error to update category");
        }
    }

    // delete category
    const deleteCategory = async (cid) => {
       
        try {
            const { data } = await axios.delete(`/api/v1/category/delete-category/${cid}`);
            if(data.success){
                toast.success(`${catname} deleted successfully`);
                getCategories();
                
            } else{
                toast.error(data.message);
            }
        } catch (err) {
            console.error(err.message);
            toast.error("Error to delete category");
        }
    }

    useEffect(() => {
        getCategories();
    }, []);

    return (
        <div title={"Orders"} className="flex sm:flex-row flex-col justify-start items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
            <div className=" sm:basis-1/4  m-2" >
                <AdminMenu />
            </div>
            <div className="flex flex-col sm:basis-3/4 m-2 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif  min-h-screen ">
                <div><h1 className="text-2xl font-bold text-center p-4">Manage Category</h1></div>
                <div>
                    <CategoryForm handleSubmit={createCategory} value={catname} setValue={setCatname} />
                </div>
                <div className=" flex justify-center px-6">
                    <table className="table-auto w-full border-collapse border  border-pink-300">
                        <thead className="">
                            <tr className="">
                                <th className="border  p-2 border-pink-300">Name</th>
                                <th className="border p-2 border-pink-300">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {category?.map((category) => (
                                <tr key={category._id}>
                                    <th className="border font-normal border-pink-300">{category.name}</th>
                                    <th className="border border-pink-300 p-2">
                                        <button className="  bg-gradient-to-b from-blue-500 to-blue-300 text-white p-2 m-2 rounded-md"
                                                onClick={() => {
                                                    setVisible(true); 
                                                    setUpdatedName(category.name); 
                                                    setSelected(category);
                                                }}>
                                                Edit
                                        </button>
                                        <button className="  bg-gradient-to-b from-red-500 to-red-300 text-white p-2 m-2 rounded-md"
                                                onClick={() =>{deleteCategory(category._id)}}>Delete</button>
                                    </th>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <Modal onCancel={() => setVisible(false)} footer={null} open={visible}>
                    <CategoryForm handleSubmit={updateCategory} value={updatedName} setValue={setUpdatedName} />
                </Modal>
            </div>
        </div>
    );
}
export default CreateCategory;

