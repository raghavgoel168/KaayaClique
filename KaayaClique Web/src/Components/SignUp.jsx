import React, { useEffect } from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';
import 'react-toastify/dist/ReactToastify.css';
import loginimage from "../assets/images/login-page.jpeg";
import axios from "axios";


const SignUp = () => {
   
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
       try{
            const res = await axios.post("/api/v1/auth/register", {
                name,
                email,
                phone,
                address,
                password,
            });
            
            //console.log(res);
            if(res && res.data.success == true){
                toast.success(res.data && res.data.message);
                navigate("/login");
            }
            else{
                toast.error(res.data.message);
            }
       } catch (error) {
           //console.log("error",error)
           toast.error("User registration failed")
         }
    }
    
    return (
        <div id= "register" className={" flex  lg:flex-row justify-center p-8 bg-gradient-to-b from-white via-pink-50 to-amber-50 w-screen min-h-screen"}>

            <div className={"grid grid-cols-2 sm:flex-wrap sm:justify-center basis-2/3  mt-4 mb-20 sm:mt-20 border border-gray-100 bg-slate-50 rounded-lg  w-auto h-auto"}>
                <div>
                <form id={"registerForm"} onSubmit={handleSubmit} >
                <div className={"flex flex-wrap justify-center m-4 sm:basis-1/3 "}>
                    <h1 className={" font-serif text-center font-bold text-blue-400 text-xl sm:text-3xl  "}>Sign Up</h1>
                </div>                
                <div className={"flex flex-col justify-end m-4"}>
                <label htmlFor="name" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Username</label>
                    <input id={"name"}
                        type={"name"}
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder={"Username"}
                        required={true}
                        autoComplete={"name"}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>


                    <label htmlFor="email" className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Email</label>
                    <input id={"email"}
                        type={"email"}
                        placeholder={"Email"}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required={true}
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
                        required={true}
                        className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"></input>
                   
                    <button type= "submit" className=" flex justify-center mr-8 ml-8 mt-6  py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800"> Submit </button>
                        <ToastContainer />
                    <hr className={"bg-white mt-6 ml-6 mr-6"}></hr>
                    <p className={"text-center text-gray-300 mt-1 "}>OR</p>

                    <div className="grid grid-flow-col ">
                        
                        <NavLink to={"/login"} target={"_self"} rel="noreferrer" className="flex justify-end ">
                            <button className="  mr-2 mt-6  py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800"> Login </button>
                        </NavLink>
                        
                        
                        <NavLink to={"/"} target={"_self"} rel="noreferrer" className="flex justify-start ">
                            <button className=" ml-2 mt-6  py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800">Home </button>
                        </NavLink>
                        
                    </div>
                </div>
                </form>
                </div>
                <div className="flex object-cover sm:visible">
                    <img src= {loginimage} alt="login" className=" m-4  " />
                </div>

                
            </div>
        </div>
    )
}

export default SignUp;