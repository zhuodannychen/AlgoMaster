import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Pagination from "./Utilities/Pagination"
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faTrash, faPenToSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

function Profile() {
    const navigate = useNavigate()
    const [authenticated, setauthenticated] = useState(null);
    const [users, setUsers] = useState([]) // includes past contests
    const [admins, setAdmins] = useState([]) // includes present and future contests
    const [displayUsers, setDisplayUsers] = useState("users")
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(5);
  
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  
    const slicedUsers = users.slice(indexOfFirstRecord, indexOfLastRecord)
    const slicedAdmins = admins.slice(indexOfFirstRecord, indexOfLastRecord)
    const nPages = Math.ceil((displayUsers == "users" ? users.length : admins.length) / recordsPerPage)


    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("authenticated"))
        console.log(loggedInUser)
        if (loggedInUser) {
            setauthenticated(loggedInUser);
        } else {
            navigate("/");
        }

        // Grab users from database
        Axios.get("http://localhost:3001/users").then((response) => {
            const allUsers = response.data
            console.log(allUsers)
            const newAdmins = allUsers.filter(user => user['isadmin'] === true)
            const newUsers = allUsers.filter(user => user['isadmin'] !== true)
            setUsers(newUsers)
            setAdmins(newAdmins)
        })

    }, []);

    const logout = () => {
        localStorage.setItem("authenticated", JSON.stringify(false));
        navigate("/"); // back to login page
    }

    const deleteUser = (user_id) => {
        if (window.confirm("Are you sure?") == true){
            const newUsers = users.filter(user => user['user_id'] !== user_id)
            setUsers(newUsers)
            Axios.delete("http://localhost:3001/users/" + user_id)
         }
    }

    const makeAdmin = (user_id) => {
        if (window.confirm("Are you sure?") == true){
            const newUsers = users.filter(user => user['user_id'] !== user_id)
            const newAdmin = users.filter(user => user['user_id'] === user_id)
            const newAdmins = admins.concat(newAdmin)
            setUsers(newUsers)
            setAdmins(newAdmins)
            Axios.post("http://localhost:3001/users/" + user_id)
         }
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

            <select className="form-select mb-3" onChange={(e) => setDisplayUsers(e.target.value)}>
                <option selected value="users"> Users </option>
                <option value="admins"> Admins </option>
            </select>

            { displayUsers == "users" ? slicedUsers.map((users) => 
            <li key={users['user_id']}>
                <h6>Username: {users['username']}</h6>
                <h6>{users['firstname']} {users['lastname']}</h6>
                <FontAwesomeIcon className='pointerOnHover' icon={faTrash} onClick={() => deleteUser(users['user_id'])} />
                <FontAwesomeIcon className='pointerOnHover' icon={faPlus} onClick={() => makeAdmin(users['user_id'])} />
            </li>
            )
            : slicedAdmins.map((admins) => 
            <li key={admins['user_id']}>
                <h6>Username: {admins['username']}</h6>
                <h6>{admins['firstname']} {admins['lastname']}</h6>
            </li>
            )}

          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={ setCurrentPage }/>
        </div>
    );
}

export default Profile;
