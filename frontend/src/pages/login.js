import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

  const [username,setUsername] = useState("");
  const [password,setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {

    try{

      const res = await API.post("/login",{
        username,
        password
      });

      localStorage.setItem("token",res.data.token);

      navigate("/dashboard");

    }catch(err){

      alert("Invalid credentials");

    }

  }

  return(

    <div>

      <h2>Login</h2>

      <input
      placeholder="Username"
      onChange={(e)=>setUsername(e.target.value)}
      />

      <br/>

      <input
      type="password"
      placeholder="Password"
      onChange={(e)=>setPassword(e.target.value)}
      />

      <br/>

      <button onClick={handleLogin}>
      Login
      </button>

    </div>

  )

}

export default Login;