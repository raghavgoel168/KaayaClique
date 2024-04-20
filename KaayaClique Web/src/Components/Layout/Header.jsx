import React, { useEffect } from "react";
import {NavLink, Link} from "react-router-dom";
import logo from "../../assets/icons/Logo KaayaClique.png";
import menuicon from "../../assets/icons/icon-menu.png";
import axios from "axios";
import { useState } from "react";
import { useAuth } from "../../context/authContext";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import SearchInput from "../Forms/SearchInput";
import useCatergory from "../../hooks/useCategory";
import { useCartContext } from "../../context/CartContext";

const Header = () => {
    const [userdata, setUserdata] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const [auth, setAuth] = useAuth();
    const categories = useCatergory();
    const [cart] = useCartContext();
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

    // open and close menu
    const changeIsopen = () => {
        setIsOpen(!isOpen);
    }

    // logoout
    const logout = ()=>{
        // google logout handler
        if(Object?.keys(userdata)?.length > 0) {window.open("http://localhost:8000/logout","_self")}
        else{
            // logout handler
            setAuth({
                ...auth,
                user: null,
                token: ""
            });
            
            localStorage.removeItem("auth");
           
        }
    }

    useEffect(() => {
        
        getGoogleUserData()
        },
        []
    );
    return (
        <>        
        <header className="shadow-lg shadow-stone-300 bg-gradient-to-b from-pink-300 to-pink-50 font-serif font-semibold text-gray-100 sm:flex sm:justify-between sm:items-center sm:px-4 sm:py-3 ">
            <div className="flex items-center justify-between px-4 py-3 sm:p-0">
                <div>
                    <img className="h-12 rounded-full" src={logo} alt="KaayaClique"/>
                    
                </div>
                <div><h1 className="text-2xl p-2 text-red-500 font-serif">KaayaClique</h1></div>
                <div className="sm:hidden ">
                    <button onClick={changeIsopen} className="block text-gray-500 hover:text-white pointer-events-auto focus:text-white focus:outline-none">
                        <img  src={menuicon} alt="menu" className="h-6 w-6 fill-current"/>
                    </button>
                </div>
            </div>
            <div>
                <SearchInput />
            </div>
            <nav className= { `${isOpen ? 'grid justify-center' : 'hidden' } px-2 pt-2 pb-4 sm:flex sm:p-0 sm:justify-center`}>
              
                <Menu as="div" className="relative inline-block text-left">
                    <div>
                        <Menu.Button className="inline-flex w-full sm:justify-center justify-start  rounded-m bg-transparent px-2 py-1  text-red-500 ">
                            Categories
                        <ChevronDownIcon className="-mr-1 h-5 w-5 text-red-400" aria-hidden="true" />
                        </Menu.Button>
                    </div>

                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                    >
                        <Menu.Items className="absolute flex flex-col justify-center right-0 z-10 mt-2 w-auto px-2 origin-top-right rounded-md bg-pink-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                            <div className="py-1 ">
                                <Menu.Item className="bg-pink-200">
                                {({ active }) => (
                                    <NavLink to="/categories"
                                    className="mt-1  px-2 py-1 flex text-center font-normal justify-start text-pink-400  rounded hover:text-pink-400 sm:mt-0 ">All Categories</NavLink>
                                )}
                                </Menu.Item>
                                
                                {categories.map((category) => (
                                    <Menu.Item key={category._id}>
                                    
                                    {({ active }) => (
                                        <div className="flex text-center font-normal justify-center">
                                        <NavLink to={`/category/:${category.slug}`}
                                                className="mt-1  px-2 py-1  text-pink-400 rounded hover:text-pink-400 sm:mt-0 ">
                                            {((category.name).charAt(0).toUpperCase() + (category.name).slice(1))}
                                        </NavLink>
                                        </div>
                                    )}
                                    
                                    </Menu.Item>
                                ))}
                            </div>
                        </Menu.Items>
                    </Transition>
                </Menu>

                
                {/* <NavLink to="/" className="  px-2 py-1 text-red-500 font-semibold rounded hover:bg-pink-50">Brand</NavLink> */}
                <NavLink to="/home" className="  px-2 py-1 text-red-500 font-semibold rounded hover:bg-pink-50">Home</NavLink>
                <NavLink id = "cartimg" to="/cart" className=" text-red-500 font-semibold rounded hover:bg-pink-50  ml-2 ">
                    <div className=" bg-transparent relative mr-2  flex sm:justify-center justify-start">
                    
                        <div className=" absolute left-3  ">
                        <p className="flex h-1 w-2 items-center justify-center rounded-full bg-red-500 p-3 text-xs text-white">{cart?.length}</p>
                        </div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="file: mt-3 h-6 w-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
                        </svg>
                    </div>
                </NavLink>
                { (Object?.keys(userdata)?.length > 0) || (auth.user) ? (
                    <>
                        <Menu as="div" className="relative inline-block text-left">
                            <div>
                                <Menu.Button className="inline-flex w-full  sm:justify-center justify-start rounded-m bg-transparent px-0 ml-2 py-1  text-red-500 ">
                                    {Object?.keys(userdata)?.length > 0 ? userdata.displayName : auth.user?.name}
                                <ChevronDownIcon className="-mr-1 h-5 w-5 text-red-400" aria-hidden="true" />
                                </Menu.Button>
                            </div>

                            <Transition
                                as={Fragment}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95"
                            >
                                <Menu.Items className="absolute flex flex-col justify-center right-0 z-10 mt-2 w-auto px-2 origin-top-right rounded-md bg-gradient-to-br from-pink-300 to-pink-50 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                    <div className="py-1">
                                        <Menu.Item>
                                        {({ active }) => (
                                            <NavLink to={`${auth.user?.role === 1 ? "/dashboard/admin" : "/dashboard/user"}`}
                                            className="mt-1  px-2 py-1 text-red-500  rounded hover:text-pink-400 sm:mt-0 ">Dashboard</NavLink>
                                        )}
                                        </Menu.Item>
                                       </div>
                                    <div className="py-1"> 
                                        <Menu.Item>
                                            {({ active }) => (
                                            <NavLink onClick={logout} to="/" className=" mt-1 px-2 py-1 text-red-500  rounded hover:text-pink-400 sm:mt-0 " >Logout</NavLink>
                                            )}
                                        </Menu.Item>
                                        
                                    </div>
                                    </Menu.Items>
                                </Transition>
                        </Menu>
                        
                        <NavLink onClick={logout} to="/" className=" mt-1 sm:ml-2 px-2 py-1 text-red-500 flex justify-start rounded hover:text-pink-400 sm:mt-0 " >Logout</NavLink>

                    </>
                ) : (
                <>
                    
                    <NavLink to="/login" className="mt-1  block px-2 py-1 text-red-500 font-semibold rounded hover:bg-pink-50 sm:mt-0 sm:ml-2">Login</NavLink>
                    {/* <NavLink to="/contact" className="mt-1  block px-2 py-1 text-red-500 font-semibold rounded hover:bg-pink-50 sm:mt-0 sm:ml-2">Contact Us</NavLink> */}
                </>
                 )}
                 
            </nav>
        </header>
        </>
    )
};

export default Header;