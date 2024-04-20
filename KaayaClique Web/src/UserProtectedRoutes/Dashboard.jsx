// import React from "react";
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';
import UserMenu from '../Components/Layout/UserMenu';


const Dashboard = () => {
    const [auth] = useAuth();
    const [userdata, setUserdata] = useState({});
    const headers = {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Access-Control-Allow-Credentials": true,
    }
    
    const getGoogleUserData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/login/sucess", { withCredentials: true, headers: headers }); 
            setUserdata(response.data.user);
        } catch (err) {
            //console.log("error", err);
        }
    }
    
    useEffect(() => {
        
        getGoogleUserData()
        },
        []
    );
    return (
        <div title={"Dashboard"} className="flex sm:flex-row flex-col justify-start items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
            <div className=" sm:basis-1/3 sm:m-0 m-2" >
                <UserMenu />
            </div>
            <div className="flex flex-col sm:basis-2/3 px-2 card sm:w-auto w-64 border rounded-md border-pink-300 h-80 bg-gradient-to-t from-pink-100 via-amber-50 to-gray-100 ml-2 ">
                <h1 className=" text-2xl font-bold  mt-2">User Details:</h1>
                <hr className="bg-zinc-400 mb-2"></hr>
                <h3 className=" text-zinc-500 py-2 ">User Name: {Object?.keys(userdata)?.length > 0 ? userdata.displayName : auth?.user?.name}</h3>
                <h3 className=" text-zinc-500 py-2 ">User Email: {Object?.keys(userdata)?.length > 0 ? userdata.email : auth?.user?.email}</h3>
                <h3 className=" text-zinc-500 py-2 ">Contact No.: {Object?.keys(userdata)?.length > 0 ? " " : auth?.user?.phone}</h3>
                <h3 className=" text-zinc-500 py-2 ">Address: {Object?.keys(userdata)?.length > 0 ? " " : auth?.user?.address}</h3>

                
            </div>
            
            
        </div>
    )

};

export default Dashboard;