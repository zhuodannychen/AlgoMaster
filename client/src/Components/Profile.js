import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Pagination from './Utilities/Pagination'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
// import { useSelector } from 'react-redux'
import Contest from './Contests/Contest'

import '../App.css'

function Profile() {
    const navigate = useNavigate()
    const [authenticated, setauthenticated] = useState(null)
    const [username, setUsername] = useState(null) // current user
    const [isAdmin, setIsAdmin] = useState(null) // is current user admin
    const [userContests, setUserContests] = useState([]) // list of contests the user has signed up for

    const [users, setUsers] = useState([]) // list of users in DB
    const [admins, setAdmins] = useState([]) // list of admins in DB
    const [displayUsers, setDisplayUsers] = useState("users") // admin feature: display list of users or admins
    const [currentPage, setCurrentPage] = useState(1) // current page when displaying users
    const [recordsPerPage] = useState(5) // display 5 users/admins per page

    const indexOfLastRecord = currentPage * recordsPerPage
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage

    const slicedUsers = users.slice(indexOfFirstRecord, indexOfLastRecord) // display sublist of users
    const slicedAdmins = admins.slice(indexOfFirstRecord, indexOfLastRecord) // display sublist of admins
    const nPages = Math.ceil((displayUsers == "users" ? users.length : admins.length) / recordsPerPage) // find total number of pages

    // runs every new component mount
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
            const newAdmins = allUsers.filter(user => user['isadmin'] === true)
            const newUsers = allUsers.filter(user => user['isadmin'] !== true)
            setUsers(newUsers)
            setAdmins(newAdmins)
        })

        // grab contests the user has signed up for
        Axios.get("http://localhost:3001/user_contests", {
            params: {
                username: username
            }
        }).then((response) => {
            setUserContests(response.data)
        })
    }, []);

    const logout = () => {
        localStorage.setItem("authenticated", JSON.stringify(false));
        localStorage.setItem("isAdmin", JSON.stringify(false));
        localStorage.setItem("username", JSON.stringify(""));
        navigate("/"); // navigate back to login page after logging out
    }

    const deleteUser = (user_id) => {
        if (window.confirm("Are you sure you want to delete this user?") == true) {
            const newUsers = users.filter(user => user['user_id'] !== user_id)
            setUsers(newUsers)
            Axios.delete("http://localhost:3001/users/" + user_id)
        }
    }

    const makeAdmin = (user_id) => {
        if (window.confirm("Are you sure you want to make this user admin?") == true) {
            const newUsers = users.filter(user => user['user_id'] !== user_id)
            const newAdmin = users.filter(user => user['user_id'] === user_id)
            const newAdmins = admins.concat(newAdmin)
            setUsers(newUsers)
            setAdmins(newAdmins)
            Axios.post("http://localhost:3001/users/" + user_id)
        }
    }

    return (
        <div className="container">
            <h1 class="display-6">Welcome {username}</h1>
            <button style={{ margin: "25px 0px 25px 0px" }} onClick={logout}>Log out</button>

            {isAdmin ?
                <div>
                    <select className="form-select mb-3" onChange={(e) => setDisplayUsers(e.target.value)}>
                        <option selected value="users"> Users </option>
                        <option value="admins"> Admins </option>
                    </select>

                    {displayUsers == "users" ?
                        slicedUsers.map((users) =>
                            <li key={users['user_id']} style={{ listStyleType: "none" }}>
                                <div class="card m-2" style={{ marginBottom: "25px", width: "1000px" }}>
                                    <div class="card-body">
                                        <h3 class="card-title">Username: {users['username']}</h3>
                                        <h4 class="card-subtitle text-muted">{users['firstname']} {users['lastname']}</h4>
                                        <FontAwesomeIcon className='pointerOnHover fa-lg' style={{ margin: "10px 10px 10px 10px" }} icon={faTrash} onClick={() => deleteUser(users['user_id'])} />
                                        <FontAwesomeIcon className='pointerOnHover fa-lg' style={{ margin: "10px 10px 10px 10px" }} icon={faPlus} onClick={() => makeAdmin(users['user_id'])} />
                                    </div>
                                </div>
                            </li>
                        )
                    : slicedAdmins.map((admins) =>
                        <li key={admins['user_id']} style={{ listStyleType: "none" }}>
                            <div class="card m-2" style={{ marginBottom: "25px", width: "1000px" }}>
                                <div class="card-body">
                                    <h3 class="card-title">Username: {admins['username']}</h3>
                                    <h4 class="card-subtitle text-muted">{admins['firstname']} {admins['lastname']}</h4>
                                </div>
                            </div>
                        </li>
                    )}

                    <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            : <h1></h1>
            }

            <h2>Contests Signed Up</h2>
            {userContests.map((arr) => 
                <Contest key={arr['contest_id']}
                         name={arr['contest_name']}
                         start_date={arr['start_date']}
                         end_date={arr['end_date']}
                         contest_id={arr['contest_id']}
                />)
            }
        </div>
    );
}

export default Profile;
