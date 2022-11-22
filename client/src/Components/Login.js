import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Axios from 'axios'
import '../App.css';

function Login() {
  const navigate = useNavigate()
  const [usernameLog, setUsernameLog] = useState("")
  const [passwordLog, setPasswordLog] = useState("")
  const [logStatus, setLogStatus] = useState("")
//   const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("authenticated")) || false;
    if (loggedInUser) {
        navigate("/profile");
    }
  }, []);

  const login = () => {
    Axios.post("http://localhost:3001/login", {
        username: usernameLog,
        password: passwordLog,
    }).then((response) => {
        setLogStatus(response.data[1])
        // console.log(response)
        if (response.data[0]) {
            // loggedInUser = true
            localStorage.setItem("authenticated", JSON.stringify(true));
            navigate("/profile");
        }
    })
  }

    return (
        <div className="Login">
            <h1>Login Page</h1>
            <label>Username</label>
            <input
                type="text"
                onChange={(e) => setUsernameLog(e.target.value)} />

            <label>Password</label>
            <input
                type="password"
                onChange={(e) => setPasswordLog(e.target.value)} />
            
            <button onClick={login}>Login</button>
            <h3>{logStatus}</h3>
        </div>
    );
}


export default Login;
