import React from "react";
import linkedin from "../../assets/icons/linkedin-ic.png";
import github from "../../assets/icons/github-ic.png";
import discord from "../../assets/icons/discord-ic.png";
import instagram from "../../assets/icons/instagram-ic.png";
import { NavLink } from "react-router-dom";

const Footer = () => { 
    return (<>
        <div className="bg-gradient-to-b from-gray-700 to-gray-500">
            <div className="justify-center flex  ">
                <p className="  mt-8 text-lg text-amber-200 font-serif">All Rights Reserved@KaayaClique</p>
            </div>
            <div className=" grid grid-flow-col  h-auto mt-0 py-0 items-start justify-center  ">
            
                <NavLink to="/policy" className="justify-center flex ">
                    <h2 className=" mt-10 mb-4 px-4   text-xl text-gray-300 font-serif hover:underline-offset-1 hover:underline-blue-100 hover:text-blue-400">Privacy Policy</h2>
                </NavLink >  
            
                <NavLink to="/about" className="justify-center flex">
                    <h2 className=" mt-10 mb-4 px-4   text-xl text-gray-300 font-serif hover:text-blue-400">About</h2>
                </NavLink>              
            
                <NavLink to="/contact" className="justify-center flex">
                    <h2 className=" mt-10 mb-10 px-4   text-xl text-gray-300 font-serif hover:text-blue-400">Contact Us</h2>
                </NavLink>
            </div>
        
        </div>
        </>
    )
}

export default Footer;
                

{/* <div className="grid grid-flow-row justify-center text-blue-300  ">
                    <a href="https://linkedin.com/in/shivangi-tripathi-bu" target="_blank" rel="noreferrer" className="hover:text-blue-400 ">
                       
                        LinkedIn
                    </a>
                    <a href="https://github.com/ShiviTripathi13" target="_blank" rel="noreferrer" className="hover:text-blue-400 ">
                        GitHub
                    </a>
                    <a href="https://discord.com/users/402203821258776064" target="_blank" rel="noreferrer" className="hover:text-blue-400 ">
                        Discord
                    </a>
                    <a href="https://discord.com/users/402203821258776064" target="_blank" rel="noreferrer" className="hover:text-blue-400 ">
                        Instagram
                    </a>
                </div> */}