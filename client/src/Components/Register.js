import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
import image from '../Assets/images/background.jpg'
import Axios from 'axios'
import '../App.css';

function Register() {
  const navigate = useNavigate()
  const [usernameReg, setUsernameReg] = useState("")
  const [passwordReg, setPasswordReg] = useState("")
  const [regStatus, setRegStatus] = useState("")


  const register = () => {
    Axios.post("http://localhost:3001/users", {
        username: usernameReg,
        password: passwordReg,
    }).then((response) => {
        setRegStatus(response.data[0])
        console.log(response.data[1])

        if (response.data[0]){
          navigate("home");
        }
    })
  }

  return (
    <div className='flex-container' style={{ backgroundImage: `url(${image})`}}>
        <div className="Register card">
            <h1 className='title'> AlgoMaster </h1>
            <form>
                <div class="form-group">
                    <label for="email_input" className='mb-2'>Your email </label>
                    <div className='input-group mb-3' >
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <FontAwesomeIcon icon={faUser} style={{fontSize: 24}}/>
                        </div>
                      </div>
                      <input type="email" class="form-control" id="email_input" onChange={e => setUsernameReg(e)} aria-describedby="emailHelp" placeholder="e.g. elon@tesla.com" />
                    </div>
                    
                </div>
                <div class="form-group">
                    <label for="password_input" className='mb-2'> Your password </label>
                    <div className='input-group'>
                      <div class="input-group-prepend">
                        <div class="input-group-text">
                          <FontAwesomeIcon icon={faLock} style={{fontSize: 24}} />
                        </div>
                      </div>
                      <input type="password" class="form-control" id="password_input" onChange={e => setPasswordReg(e)} placeholder="e.g. ilovemangoes123" />
                    </div>
                </div>
            </form>
            <button id="registerButton" type="button" class="btn btn-primary btn-block mt-3" onClick={register}>
              <span id="registerButtonText"> Register </span> 
            </button>
            <span id='switchToLogin' onClick={() => navigate("/")}> Already have an account? Login here </span>
        </div>
    </div>
  );
}

export default Register;
