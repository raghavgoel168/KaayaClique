import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../context/authContext";
import axios from "axios";
import Spinner from "../Spinner";




const AdminRoute = () => {
    const [ok, setOk] = useState(false);
    const [auth, setAuth] = useAuth();
    
    useEffect(() => { 
        const authCheck = async () => {
            try{
                const loginresponse = await axios.get('/api/v1/auth/adminauth') ;
                
                if (loginresponse.data.ok)  {
                    setOk(true);
                } else {
                    setOk(false);
                }
            } catch (err) {
                //console.log("error", err);
            }
        }
        if(auth?.token ){
            authCheck();
        }
    
    }, [auth?.token]);

    return (ok  ) ? <Outlet/> : <Spinner path=""/>;
}

export default AdminRoute;