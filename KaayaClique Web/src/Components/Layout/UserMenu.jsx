import React from "react";
import { NavLink } from "react-router-dom";

const UserMenu = () => {
    return (
        <div className="flex flex-col justify-start mr-4 ml-2 p-2 bg-gradient-to-t from-pink-100 via-amber-50 to-gray-100  border rounded-md border-pink-300 sm:h-80 h-auto">
            <div>
                <h1 className="text-2xl font-bold ">Dashboard</h1>
                <hr className="bg-zinc-400 mt-2 w-60"></hr>

            </div>
            <div className="flex flex-row justify-start mt-4 ">
                <div className="flex justify-start ">
                    <ul >
                        <li className="p-2"><NavLink to="/dashboard/user/profile" className=" p-2  bg-zinc-200 hover:bg-pink-300 ">Profile</NavLink></li>
                        <li className="p-2"><NavLink to="/dashboard/user/orders" className=" p-2  bg-zinc-200 hover:bg-pink-300 ">Orders</NavLink></li>

                    </ul>
                </div>
            </div>
        </div>
    );
}
export default UserMenu;