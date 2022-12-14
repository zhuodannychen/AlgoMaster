import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import image from '../Assets/images/background.jpg'
import Axios from 'axios'
import '../App.css'
import { useDispatch } from 'react-redux'
import { updateUserName, updateIsAdmin } from '../redux/reducers/userReducer'
// import { updateIsAdmin, updateUserName } from '../redux/reducers/userReducer';

function Login() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [usernameLog, setUsernameLog] = useState("") // username in the input field for username
    const [passwordLog, setPasswordLog] = useState("") // password in the input field for password
    const [logStatus, setLogStatus] = useState("") // is the user logged in?
    //   const [authenticated, setauthenticated] = useState(localStorage.getItem(localStorage.getItem("authenticated") || false));

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("authenticated")) || false
        if (loggedInUser) {
            navigate("/contests")
        }
    }, [])

    const login = () => {
        console.log(usernameLog, passwordLog)
        Axios.post("http://localhost:3001/login", {
            username: usernameLog,
            password: passwordLog,
        }).then((response) => {
            console.log(response)
            setLogStatus(response.data[1])
            if (response.data[0]) {
                // loggedInUser = true
                localStorage.setItem("authenticated", JSON.stringify(true))
                localStorage.setItem("username", JSON.stringify(response.data[2]))
                localStorage.setItem("isAdmin", JSON.stringify(response.data[3]))
                dispatch(updateUserName({ username: response.data[2] }))
                dispatch(updateIsAdmin({ isAdmin: response.data[3] }))
                navigate("/contests")
            }
        })
    }


    return (
        <div className='flex-container' style={{ backgroundImage: `url(${image})` }}>
            <div className="Login card">
                <h1 className='title'> AlgoMaster </h1>
                <form>
                    <div className="form-group">
                        <label for="email_input" className='mb-2'>Your email </label>
                        <div className='input-group mb-3' >
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <FontAwesomeIcon icon={faUser} style={{ fontSize: 24 }} />
                                </div>
                            </div>
                            <input type="email" className="form-control" id="email_input" onChange={e => setUsernameLog(e.target.value)} aria-describedby="emailHelp" placeholder="e.g. elon@tesla.com" />
                        </div>
                    </div>
                    <div className="form-group">
                        <label for="password_input" className='mb-2'> Your password </label>
                        <div className='input-group'>
                            <div className="input-group-prepend">
                                <div className="input-group-text">
                                    <FontAwesomeIcon icon={faLock} style={{ fontSize: 24 }} />
                                </div>
                            </div>
                            <input type="password" className="form-control" id="password_input" onChange={e => setPasswordLog(e.target.value)} placeholder="e.g. ilovemangoes123" />
                        </div>
                    </div>
                </form>
                <button id="loginButton" type="button" className="btn btn-primary btn-block mt-3" onClick={login}>
                    <span id="loginButtonText"> Login </span>
                </button>
                <h4>{logStatus}</h4>
                <span id='switchToRegister' onClick={() => navigate("register")}> Don't have an account? Register here </span>
            </div>
        </div>
    )
}


export default Login;
