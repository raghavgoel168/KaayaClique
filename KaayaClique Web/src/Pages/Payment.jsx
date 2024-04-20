import React, {useState, useEffect} from "react";
import { useCartContext } from "../context/CartContext";
import { useAuth } from "../context/authContext";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import DropIn from "braintree-web-drop-in-react";
import toast from "react-hot-toast";



const Payment = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCartContext();
    const [userdata, setUserdata] = useState({});
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);

    // get client token
    const getClientToken = async () => {
        try {
            const {data} = await axios.get("/api/v1/product/braintree/token");
            setClientToken(data?.clientToken);
        } catch (error) {
            //console.log(error);
        }
    }
    // handle payment
    const handlePayment = async () => {
        try {
            setLoading(true);
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post("/api/v1/product/braintree/payment", {nonce, cart});
            setLoading(false);
            localStorage.removeItem("cart");
            setCart([]);
            toast.success("Payment Successfull");
            navigate("/dashboard/user/orders");
        } catch (error) {
            //console.log(error);
            setLoading(false);
        }
    }
    useEffect(() => {
        getClientToken();
    }, [auth?.token]);

    return (
        <div className="min-h-screen p-2 m-2 flex flex-col justify-start basis-1/2">
        
            {!clientToken || !cart?.length ? (
            ""
            ) : (
            <div className="basis-1/2 text-gray-800 italic p-2 m-2 text-lg font-serif font-semibold">
            <DropIn
                options={{
                    authorization: clientToken,
                    paypal: {
                        flow: "checkout",
                    },
                }}
                onInstance={(instance) => setInstance(instance)}
                
            />
            <div className="basis-1/2 flex justify-center">
            <button className=" max-w-fit mt-8  bg-gradient-to-br from-amber-300 to-amber-100   text-gray-600  p-2 rounded-md"
                onClick={handlePayment}
                target="_blank"
                disabled={loading || !instance || !auth?.user?.address}>
                {loading ? "Processing ...." : "Make Payment"}
            </button>
            </div>
            </div>
            )}
        </div>
    );
}
export default Payment;
