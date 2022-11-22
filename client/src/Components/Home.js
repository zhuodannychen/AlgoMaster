import { useState } from 'react'
import '../App.css';

function Home() {
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")


  return (
    <div className="Home">
        <h1>Home page</h1>
    </div>
  );
}

export default Home;
