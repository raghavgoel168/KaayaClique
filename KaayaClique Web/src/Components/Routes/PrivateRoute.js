import {useState, useEffect} from "react";
import {Outlet} from "react-router-dom";
import {useAuth} from "../../context/authContext";
import axios from "axios";
import Spinner from "../Spinner";




const PrivateRoute = () => {
    const [ok, setOk] = useState(false);
    const [userGoogleId, setUserGoogleId] = useState({});
    const [auth, setAuth] = useAuth();
    
    useEffect(() => {
        const getGoogleUserData = async () => {
            try {
                const response = await axios.get("http://localhost:8000/login/sucess", { withCredentials: true }).then((response) => { return response.data.user; });
                setUserGoogleId(response.googleId);
                if(Object.keys(userGoogleId).length > 0){
                    setOk(true);
                } else {
                    setOk(false);
                }
                
            } catch (err) {
                //console.log("error", err);
            }
        }
        
        const authCheck = async () => {
            
            const loginresponse = await axios.get('/api/v1/auth/userauth') ;
            
            if (loginresponse.data.ok)  {
                setOk(true);
            } else {
                setOk(false);
            }
        }
        const res = getGoogleUserData();
        if(auth?.token ){
            authCheck();
        }
       else if( Object.keys(userGoogleId).length > 0){
            getGoogleUserData();
        }
        
    }, [auth?.token, userGoogleId]);

    return (ok  ) ? <Outlet/> : <Spinner/>;
}

export default PrivateRoute;