import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";


const Profile = () => {
    const navigate = useNavigate();
    const [auth, setAuth] = useAuth(); 
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");

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

    // get user data
    useEffect(() => {
        if(auth.user){
            const {name, email, phone, address} = auth?.user;
            setName(name);
            setEmail(email);
            setPhone(phone);
            setAddress(address);
        } else {
        setName(userdata.displayName);
        setEmail(userdata.email);
        }
    }, [auth?.user]);

    // update user profile
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const { data } = await axios.put("/api/v1/auth/profile", {
            name,
            phone,
            address,
            email,
            password,
            
        });
        if (data?.error) {
            toast.error(data?.error);
        } else {
            if(auth.user){
                setAuth({ ...auth, user: data?.updatedUser });
            } else {
                setUserdata(data?.updatedUser);
            }
            let ls = localStorage.getItem("auth");
            ls = JSON.parse(ls);
            ls.user = data.updatedUser;
             localStorage.setItem("auth", JSON.stringify(ls));
            toast.success("Profile Updated Successfully");
            navigate("/dashboard/user");
        }
        } catch (error) {
        //console.log(error);
        toast.error("Something went wrong");
        }
    };
    
    return (
        <div id= "register" className={" flex justify-center p-8 bg-gradient-to-b from-white via-pink-50 to-amber-50 w-screen min-h-screen"}>

            <div className={" sm:flex-wrap sm:justify-center basis-1/2  mt-4 mb-20 sm:mt-20 border border-gray-100 bg-slate-50 rounded-lg  w-auto h-auto"}>
                <div>
                <form id={"registerForm"} onSubmit={handleSubmit} >
                <div className={"flex flex-wrap justify-center m-4 sm:basis-1/3 "}>
                    <h1 className={" font-serif text-center font-bold text-blue-400 text-xl sm:text-3xl  "}>User Profile</h1>
                </div>                
                <div className={"flex flex-col justify-end m-4"}>
                <label htmlFor="name" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Username</label>
                    <input id={"name"}
                        type={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Username"}
                        autoComplete={"name"}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>


                    <label htmlFor="email" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Email</label>
                    <input id={"email"}
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled
                        autoComplete={"email"}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>

                    <label htmlFor="phone" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Contact No.</label>
                    <input id={"phone"}
                        type={"phone"}
                        placeholder={"phone"}
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required={true}
                        autoComplete={"phone"}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>

                    <label htmlFor="address" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Address</label>
                    <input id={"address"}
                        type={"address"}
                        placeholder={"Address"}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        required={true}
                        autoComplete={"address"}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>



                    <label htmlFor="password" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-6">Password</label>
                    <input id={"password"}
                        type={"password"}
                        placeholder={"Password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="items-start justify-start max-w-full mb-12 mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"></input>
                   
                    <button type= "submit" 
                            
                            className=" flex justify-center mr-8 ml-8 mt-6  py-2  text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800">
                        Update
                    </button>
                    <ToastContainer />
                    
                        
                </div>
                </form>
                </div>
                
                
            </div>
        </div>
    )
}

export default Profile;