import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Contest from './Contest';
import Axios from 'axios'
import { Link } from 'react-router-dom'
import "../../App.css"

function Contests() {
  const navigate = useNavigate();
  const [contests, setContests] = useState([
    ["DTCC Code-A-Thon", "Aug 27th 2021", "11 am CST", 25],
    ["Celebrate PRIDE 2021 Coding Contest", "June 25th, 2021", "11:00 am CST", 53],
    ["COVID-19 Relief for India Coding Challenge", "June 16th, 2021", "1:30 am CST", 14]
  ]);

  useEffect(() => {
    // Grab contests from database
    Axios.get("http://localhost:3001/contests").then((response) => {
        setContests(response.data)
    })
  }, [])

  return (
    <React.Fragment>
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div className='container'>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <a class="navbar-brand" href="#">AlgoMaster</a>

          <div class="collapse navbar-collapse" id="navbarTogglerDemo03">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="#">Home </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="#">Link</a>
              </li>
              <li class="nav-item">
                <a class="nav-link disabled" href="#">Disabled</a>
              </li>
            </ul>
            <ul class="navbar-nav ms-auto mt-2 mt-lg-0">
              <li class="nav-item" onClick={() => navigate("/profile")}>
                <a class="nav-link" href="#"> <FontAwesomeIcon icon={faUser}/> Profile</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className='container'>
        <div className="contests mt-5">
          {/* Add check whether user is admin */}
          <h2 className='mb-5' style={{ textAlign: 'center'}}> Contests </h2>
          <button className='btn mb-3' type='button' onClick={() => navigate("/create")}> <FontAwesomeIcon icon={faCirclePlus} /> Create Contest </button>
          {contests.map((arr) => <Contest key={arr['contest_id']} name={arr['contest_name']} date={arr['start_date']} time={arr['start_date']} participants={arr['participants']} />)}
      </div>
    </div>
    </React.Fragment>
    
  
  );
}

export default Contests;
