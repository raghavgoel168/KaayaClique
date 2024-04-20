import React from "react";
import Carousel from "../Components/ReactCarousel";
import image1 from "../assets/carousel-home-1.jpeg";
import image2 from "../assets/carousel-home-2.jpeg";
import image3 from "../assets/carousel-home-3.jpeg";
import image4 from "../assets/carousel-lakme-4.jpeg";
import image5 from "../assets/carousel-mcaffiene-1.jpeg";


const About = () => {
   
    let slides = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];
    return (
        
        <div className="flex flex-wrap justify-center bg-gradient-to-t from-grey-100 to-zinc-50 min-h-screen mt-0 mb-60">
            {/* <h1 className="text-4xl text-purple-600 mt-4"> Home</h1> */}
            <div className="w-[50%]   pt-12"><Carousel slides={slides} /></div>
            
            <div>
                <p className=" text-pink-600 font-serif italic text-xl text-center p-4">KaayaClique offers science-backed skincare products with antioxidants, peptides, and natural extracts. They tailor their products to individual skin types, concerns, and lifestyles. They prioritize clean ingredients, are eco-conscious, and deliver visible results for aging, ache, and dryness. KaayaClique is committed to sustainable practices and eco-conscious practices.</p>
            </div>
            <div className="flex flex-col">
                <div></div>
                <div><p className=" text-pink-600 font-serif italic text-xl">Happy Skin 😍</p></div>
                
                <div></div>
            </div>
        </div>
    )
};

export default About;