import { useEffect } from "react"
import { useAuth } from "../context/AuthContext";
import userService from "../services/user.service";
import { useNavigate } from "react-router-dom";


export const Home = () => {
    
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(user) {
            navigate("/dashboard");   
        }
    }, [user, navigate])

    return (
    <div>
        <h2>hi welcome home</h2>
    </div>   
    )

}