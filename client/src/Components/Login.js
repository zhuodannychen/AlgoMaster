import { useState } from 'react'
import Axios from 'axios'
import '../App.css';

function Login() {
  const [usernameLog, setUsernameLog] = useState("")
  const [passwordLog, setPasswordLog] = useState("")
  const [logStatus, setLogStatus] = useState("")

  const login = () => {
    Axios.post("http://localhost:3001/login", {
        username: usernameLog,
        password: passwordLog,
    }).then((response) => {
        setLogStatus(response.data)
        console.log(response)
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
