import {React, useState} from "react";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import google from "../assets/icons/google-ic.svg";
import loginimage from "../assets/images/login-page.jpeg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useAuth } from "../context/authContext";

const LoginAuth = () => {
    const loginWithGoogle = () => {
       window.open("http://localhost:8000/auth/google/callback", "_self");
    }
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [auth, setAuth] = useAuth();

    const location = useLocation();
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/v1/auth/login", {
                email,
                password,
            });

            if (res && res.data.success === true) {
                toast.success(res.data && res.data.message);
                setAuth({
                    ...auth,
                    user: res.data.user,
                    token: res.data.token,
                });
                localStorage.setItem("auth", JSON.stringify(res.data));
                navigate(location.state ||  "/home");
            } 
            
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            //console.log("error", error);
            toast.error("User login failed");
        }
    }
    return (
        
        <div id= "authentication" className={"  bg-gradient-to-b from-white via-pink-50 to-amber-50 w-screen min-h-screen"}>
            <div className="grid grid-cols-2  justify-center p-10 border border-gray-100 bg-slate-100 rounded-lg h-auto w-auto">
            <div className={"sm:flex-wrap sm:justify-center basis-2/3  mt-12 mb-20 sm:mt-20   w-auto h-auto"}>
                
                    <form id={"authForm"} onSubmit={handleSubmit} >
                        <div className={"flex flex-wrap justify-center m-4 sm:basis-1/3 "}>
                            <h1 className={" font-serif text-center font-bold text-blue-400 text-xl sm:text-2xl  "}>Login</h1>
                        </div>                
                        <div className={"flex flex-col justify-end m-4"}>
                        
                            <label className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-2">Email</label>
                            <input id={"email"}
                                type={"email"}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={"Email"}
                                required
                                autoComplete={"email"}
                                className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"/>

                            <label  className="items-start justify-start text-gray-500 font-serif font-semibold text-normal ml-3 mt-6">Password</label>
                            <input id={"password"}
                                type={"password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={"Password"}
                                required
                                className="items-start justify-start max-w-full mr-2 h-10 px-4 ml-2 mt-2 text-base bg-blue-100 placeholder-gray-400 italic font-serif border rounded-lg focus:shadow-outline"></input>

                            <button type="submit" className=" flex justify-center mr-8 ml-8 mt-6  py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800"> Submit </button>
                            <ToastContainer/>
                        </div>
                    </form>
                
                    <hr className={"bg-white mt-12 ml-6 mr-6"}></hr>
                    <p className={"text-center text-gray-300 mt-1"}>OR</p>
                    <div className="flex justify-center">
                        <span className={"text-center  text-gray-300 mt-1"}>
                            Don't have an account?
                            <NavLink to={"/register"} className={"text-cyan-500 underline ml-1 underline-offset-4 hover:text-cyan-300"}>   Sign Up Here</NavLink>
                        </span>
                    </div>
                    <div className="flex justify-center">
                        <button 
                            onClick={loginWithGoogle}
                            className=" p-2  mt-6 mb-1 py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200  hover:bg-gray-800">
                            <img src={google} alt={"google-icon"} className={" w-5 h-5 bg-white rounded-full inline-block mr-2 "}/>
                            Login with Google
                        </button>
                    </div>
                    <NavLink to={"/"} target={"_self"} rel="noreferrer" className="flex justify-center ">
                        <button className="  lg:ml-6 lg:mr-6 mt-6  py-2 text-small font-medium text-center text-gray-50 bg-gradient-to-b from-blue-400 to-blue-300 rounded-lg  focus:ring-blue-200 p-4 hover:bg-gray-800">Back to Home </button>
                    </NavLink>
                
            </div>
                
            <div className="flex object-cover    mt-12 mb-20 sm:mt-20  bg-slate-100  w-auto h-auto sm:visible">
                <img src= {loginimage} alt="login" className=" m-4  " />
            </div>
            </div>
        </div>
        
    )
};

export default LoginAuth;