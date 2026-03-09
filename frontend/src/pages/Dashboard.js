import { useEffect, useState } from "react";
import API from "../services/api"
import {useNavigate} from "react-router-dom"

function Dashboard(){
    const [data, setData] = useState({})
    const navigate = useNavigate()

    const token = localStorage.getItem("token")

    useEffect(()=>{
        API.get("/profile",{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then(res=>{
            setData(res.data)
        })
        .catch(()=>{
            navigate("/login")
        })
    }, [])

    const logout = async() =>{
        await API.post("/logout",{},{
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        localStorage.removeItem("token")
        navigate("/login")
    }

    return(
        <div>
            <h1>Dashboard</h1>
            <h3>{data.message}</h3>
            <p>Username: {data.username}</p>
            <p>Login Time: {data.loginTime}</p>
            <button onClick={logout}>Logout</button>
        </div>
    )
}
export default Dashboard