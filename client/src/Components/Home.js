import { useState } from 'react'
import { Link } from 'react-router-dom'
import '../App.css';

function Home() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")


  return (
    <div className="Home">
        <h1>Home page</h1>
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
        <Link to="/profile">Profile</Link>
    </div>
  );
}

export default Home;
