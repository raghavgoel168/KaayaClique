
import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

const AdminMenu = () => {
   
    return (
        <div className="flex flex-col justify-start  p-2 bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200  border rounded-md border-pink-300 text-pink-400 sm:h-80 min-h-screen">
            <div>
                <h1 className="text-2xl font-bold ">Admin Menu</h1>
                <hr className="bg-zinc-400 mt-2 w-60"></hr>

            </div>
            <div className="flex flex-row justify-start mt-4 ">
                <div className="flex justify-start ">
                    <ul >
                        <li className="p-2"><NavLink to="/dashboard/admin/create-category"  className=" p-2  hover:bg-amber-100 hover:rounded-md">Create Category</NavLink></li>
                        <li className="p-2"><NavLink to="/dashboard/admin/create-products" className=" p-2   hover:bg-amber-100 hover:rounded-md">Create Products</NavLink></li>
                        <li className="p-2"><NavLink to="/dashboard/admin/products" className=" p-2   hover:bg-amber-100 hover:rounded-md">Display Products</NavLink></li>
                        {/* <li className="p-2 "><NavLink to="/dashboard/admin/display-users" className="  p-2   hover:bg-amber-100 hover:rounded-md">Display Users</NavLink></li> */}
                        <li className="p-2 "><NavLink to="/dashboard/admin/orders" className="  p-2   hover:bg-amber-100 hover:rounded-md">Display Orders</NavLink></li>


                    </ul>
                </div>
            </div>
        </div>
    );
}


export default AdminMenu;