import React, {useState, useEffect} from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import { useAuth } from "../../context/authContext";
import axios from "axios";
import moment from "moment";

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    
    const getOrders = async () => {
        try {
            const {data} = await axios.get("/api/v1/auth/orders");
            //console.log("data: ", data);
            setOrders(data);
        } catch (error) {
            //console.log(error);
        }
    }

    useEffect(() => {
        if(auth?.token) getOrders();
    }
    , [auth?.token]);
    
    return (
        <div title={"Orders"} className="flex sm:flex-row flex-col justify-start w-full items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
            <div className=" sm:basis-1/4 sm:m-0 m-2" >
                <UserMenu />
            </div>
            <div className="flex flex-col sm:basis-3/4 px-2  card sm:w-full w-64 border rounded-md border-pink-300 overflow-scroll bg-gradient-to-t from-pink-100 via-amber-50 to-gray-100 mr-2 ">
                <div>
                    <h1 className=" text-2xl font-bold  py-2">Order Details</h1>
                    <hr className="bg-zinc-400"></hr>
                </div>
                <div>
                {orders?.map((o, i) => {
                return (
                    <div className="border shadow">
                    <table className="m-2 p-2">
                        <thead>
                        <tr className="m-2">
                            <th className="m-2 px-2 justify-center" scope="col">Status</th>
                            <th className="m-2 px-2 justify-center" scope="col"> Date</th>
                            <th className="m-2 px-2 justify-center" scope="col">Payment</th>
                            <th className="m-2 px-2 justify-center" scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="m-2"> 
                            <td className="m-2 px-2 text-center">{o?.orderStatus}</td>
                            <td className="m-2 px-2 text-center">{moment(o?.createAt).calendar()}</td>
                            <td className="m-2 px-2 text-center">{o?.payment.success ? "Success" : "Failed"}</td>
                            <td className="m-2 px-2 text-center">{o?.products?.length}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="container">
                        {o?.products?.map((p, i) => (
                        <div className="row mb-2 p-3 card flex-row" key={p._id}>
                            <div className="col-md-4">
                            <img
                                src={`/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                                width="100px"
                                height={"100px"}
                            />
                            </div>
                            <div className="col-md-8">
                            <p>{p.name}</p>
                            <p>{p.description}</p>
                            <p>Price : {p.price}</p>
                            </div>
                        </div>
                        ))}
                    </div>
                    </div>
                );
                })}
                </div >
            </div>
            
           
        </div>
    );
}

export default Orders;