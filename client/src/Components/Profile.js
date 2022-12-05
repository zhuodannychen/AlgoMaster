import { useState, useEffect, Fragment } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import Pagination from "./Utilities/Pagination"
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faTrash, faPenToSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import '../App.css';

function Profile() {
    const navigate = useNavigate()
    const [authenticated, setauthenticated] = useState(null);
    const [username, setUsername] = useState(null);
    const [isAdmin, setIsAdmin] = useState(null);

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
        const username = JSON.parse(localStorage.getItem('username')) // useSelector(state => state.user.username);
        const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) // useSelector(state => state.user.isAdmin)
        if (loggedInUser) {
            setauthenticated(loggedInUser);
            setUsername(username)
            setIsAdmin(isAdmin)
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
        localStorage.setItem("isAdmin", JSON.stringify(false));
        localStorage.setItem("username", JSON.stringify(""));
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

    const cardStyle = {
      marginBottom: "25px",
      width: "1000px"
    }

    const logooutButtonStyle = {
      margin: "25px 0px 25px 0px"
    }

    const listWithoutButtonStyle = {
      listStyleType: "none"
    }

    const iconButtonStyle = {
      margin: "10px 10px 10px 10px"
    }

    return (
        <div className="container">
            <h1 class="display-6">Welcome {username}</h1>
            <button style={logooutButtonStyle} onClick={logout}>Log out</button>

            {isAdmin ? 
            <div>
            <select className="form-select mb-3" onChange={(e) => setDisplayUsers(e.target.value)}>
                <option selected value="users"> Users </option>
                <option value="admins"> Admins </option>
            </select>

            { displayUsers == "users" ? slicedUsers.map((users) => 
            <li key={users['user_id']} style={listWithoutButtonStyle}>
              <div class="card m-2" style={cardStyle}>
                <div class="card-body">
                  <h3 class="card-title">Username: {users['username']}</h3>
                  <h4 class="card-subtitle text-muted">{users['firstname']} {users['lastname']}</h4>
                  <FontAwesomeIcon className='pointerOnHover fa-lg' style={iconButtonStyle} icon={faTrash} onClick={() => deleteUser(users['user_id'])} />
                  <FontAwesomeIcon className='pointerOnHover fa-lg' style={iconButtonStyle} icon={faPlus} onClick={() => makeAdmin(users['user_id'])} />
                </div>
              </div>
            </li>
            )
            : slicedAdmins.map((admins) => 
            <li key={admins['user_id']} style={listWithoutButtonStyle}>
              <div class="card m-2" style={cardStyle}>
                <div class="card-body">
                  <h3 class="card-title">Username: {admins['username']}</h3>
                  <h4 class="card-subtitle text-muted">{admins['firstname']} {admins['lastname']}</h4>
                </div>
              </div>
            </li>
            )}

          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={ setCurrentPage }/>
          </div>
          : <h1></h1>
            }
        </div>
    );
}

export default Profile;
