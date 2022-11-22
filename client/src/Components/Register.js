import { useState } from 'react'
import Axios from 'axios'
import '../App.css';

function Register() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [regStatus, setRegStatus] = useState("")


  const register = () => {
    Axios.post("http://localhost:3001/users", {
        username: usernameReg,
        password: passwordReg,
    }).then((response) => {
        setRegStatus(response.data)
        console.log(response)
    })
  }

  return (
    <div className="Register">
        <h1>Register Page</h1>
        <label>Username</label>
        <input
            type="text"
            onChange={(e) => setUsernameReg(e.target.value)} />

        <label>Password</label>
        <input
            type="password"
            onChange={(e) => setPasswordReg(e.target.value)} />
        
        <button onClick={register}>Register</button>
        <h3>{regStatus}</h3>
    </div>
  );
}

export default Register;
