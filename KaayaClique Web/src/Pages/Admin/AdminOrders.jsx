import React, {useState, useEffect} from "react";
import AdminMenu from "../../Components/Layout/AdminMenu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import moment from "moment";
import { useAuth } from "../../context/authContext";
import { Select } from "antd";

const AdminOrders = () => {
    const [status, setStatus] = useState([
        "Not Processed",
        "Processing",
        "Dispatched",
        "Cancelled",
        "Completed"
    ]);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    
    const getOrders = async () => {
        try {
            const {data} = await axios.get("/api/v1/auth/all-orders");
            setOrders(data);
        } catch (error) {
            //console.log(error);
        }
    }
    const handleChange = async (orderId, value) => {
        try {
            const {data} = await axios.put(`/api/v1/auth/order-status/${orderId}`, {orderStatus: value});
            toast.success(data?.message);
            getOrders();
        } catch (error) {
            //console.log(error);
        }
    }
    useEffect(() => {
        if(auth?.token) getOrders();
    }
    , [auth?.token]);
    return (
        <div title={"Orders"} className="flex sm:flex-row flex-col justify-start items-start mt-4 bg-gradient-to-t from-pink-100 via-yellow-50 to-gray-50 font-serif  min-h-screen px-2 py-2">
        <div className=" sm:basis-1/4  m-2" >
            <AdminMenu />
        </div>
        <div className="flex flex-col sm:basis-3/4 m-2 border border-pink-300 rounded-md bg-gradient-to-t from-pink-200 via-amber-100 to-gray-200 font-serif  min-h-screen ">
        
                {orders?.map((o, i) => {
                return (
                    <div className="border shadow m-2 p-2">
                    <table className="m-2 p-2">
                        <thead>
                        <tr className="m-2">
                            <th className="m-2 px-2 text-center" scope="col">#</th>
                            <th className="m-2 px-2 text-center" scope="col"> Change Status</th>
                            <th className="m-2 px-2 text-center" scope="col">Current Status</th>

                            <th className="m-2 px-2 text-center" scope="col">Buyer</th>
                            <th className="m-2 px-2 text-center" scope="col"> Date</th>
                            <th className="m-2 px-2 text-center" scope="col">Payment</th>
                            <th className="m-2 px-2 text-center" scope="col">Quantity</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className="m-2"> 
                            <td className="m-2 px-2 text-center">{i + 1}</td>
                            <td>
                            <Select
                                defaultValue={o?.orderStatus}
                                style={{ width: 120 }}
                                onChange={(value) => handleChange(o._id, value)}
                            >
                                {status.map((s, i) => (
                                <Select.Option key = {i} value = {s} >
                                    {s}
                                </Select.Option>
                                ))}
                            </Select>
                            </td>
                            <td className="m-2 px-2 text-center">{o?.orderStatus}</td>
                            <td className="m-2 px-2 text-center">{o?.orderedBy?.name}</td>
                            <td className="m-2 px-2 text-center">{moment(o?.createAt).calendar()}</td>
                            <td className="m-2 px-2 text-center">{o?.payment.success ? "Success" : "Failed"}</td>
                            <td className="m-2 px-2 text-center">{o?.products?.length}</td>
                        </tr>
                        </tbody>
                    </table>
                    <div className="container border rounded-md shadow">
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
               
        </div>
        </div>
    )
}

export default AdminOrders;