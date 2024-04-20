import {React, useState, useEffect} from "react";
import spinner from "../assets/icons/icon-spinner.png";
import { useNavigate, useLocation } from "react-router-dom";

const Spinner = ({path = "login"}) => {
    const navigate = useNavigate();
    const [counter, setCounter] = useState(3);
    const location = useLocation();

    useEffect(() => {
        const interval = setInterval(() => {
            setCounter(counter => counter - 1);
        }, 1000);
        if (counter === 0) {
            navigate(`${path}`, { state:  location.pathname  });
        }
        return () => clearInterval(interval);
    }
    , [counter, navigate, location, path]);

    return (
        <div className="flex  justify-center items-center h-screen">
            <button type="button" className="text-pink-400 italic font-serif font-bold text-2xl ... flex align-middle" disabled>
                <img src = {spinner} className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"/>
                <h1 className="text-xl text-pink-300">Redirecting in {counter} seconds...</h1>
            </button>
        </div>
    )
}

export default Spinner;