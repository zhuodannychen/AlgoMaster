import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Axios from 'axios'
import '../App.css';

function Profile() {
    const navigate = useNavigate()

    const [authenticated, setauthenticated] = useState(null);
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("authenticated"))
        console.log(loggedInUser)
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        } else {
            navigate("/");
        }
    }, []);

    const logout = () => {
        localStorage.setItem("authenticated", JSON.stringify(false));
        navigate("/"); // back to login page
    }
    
    // const displayName = () => {
    //     Axios.post("http://localhost:3001/users", {
    //         firstname: firstName,
    //         lastname: lastName,
    //         username: usernameReg,
    //         password: passwordReg,
    //     }).then((response) => {
    //         setRegStatus(response.data[0])
    
    //         if (response.data[0]){
    //           alert('Account created successfully!')
    //           navigate("/");
    //         } else {
    //           alert(response.data[1])
    //         }
    //     })
    // } 


    return (
        <div>
            <p>Welcome to your Dashboard</p>
            <button onClick={logout}>Log out</button>
        </div>
    );
}

export default Profile;
