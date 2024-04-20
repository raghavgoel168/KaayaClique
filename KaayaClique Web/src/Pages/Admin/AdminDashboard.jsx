import React from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useAuth } from "../../context/authContext";

const AdminDashboard = () => {
    const [auth] = useAuth();
    return (
        <div className="flex sm:flex-row flex-col justify-start items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
            <div className=" sm:basis-1/3 sm:m-0 m-2" >
                <AdminMenu />
            </div>
            <div className="flex flex-col sm:basis-2/3 px-2 card sm:w-auto w-64 border rounded-md border-pink-300 h-80 bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 ml-2 min-h-screen ">
                <h1 className=" text-2xl font-bold  py-2">Admin Details:</h1>
                <hr className="bg-zinc-400"></hr>
                <h3 className=" text-zinc-500 py-2 ">Admin Name: {auth?.user?.name}</h3>
                <h3 className=" text-zinc-500 py-2 ">Admin Email: {auth?.user?.email}</h3>
                
            </div>
            
            
        </div>
    )
}

export default AdminDashboard;