import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Contest from './Contest';
import image from "../../Assets/images/background.jpg"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import "../../App.css"

function Contests() {
  const navigate = useNavigate()
  const [pastContests, setPastContests] = useState([]) // includes past contests
  const [futureContests, setFutureContests] = useState([]) // includes present and future contests

  const contestSplit = (contests) => {
    let low = 0
    let high = contests.length-1
    const curDate = new Date(Date.now())
    const curTS = curDate.getUTCFullYear() + '-' + (curDate.getUTCMonth()+1) + '-' + curDate.getUTCDate() + ' ' + curDate.getUTCHours() + ':' + curDate.getMinutes() + ':' + curDate.getSeconds()
    console.log(curTS)
    console.log(contests)

    while (low < high) {
        let mid = low + Math.floor((high - low + 1) / 2)
        if (curTS < contests[mid]['end_date'])
            high = mid - 1;
        else
            low = mid
    }
    return low
  }

  useEffect(() => {
    // Grab contests from database
    Axios.get("http://localhost:3001/contests").then((response) => {
        const allContests = response.data
        const splitIdx = contestSplit(allContests)
        const past = allContests.slice(0, splitIdx)
        const future = allContests.slice(splitIdx, allContests.length)
        
        setFutureContests(future)
        setPastContests(past.reverse())
    })
  }, [])

  return (
    <div style={{ backgroundImage: `url(${image})`, height: '100vh'}}>
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
          <h2 className='mb-5' style={{ textAlign: 'center', color: 'white'}}> Contests </h2>
          <button className='btn mb-3' type='button' onClick={() => navigate("/create")} style={{color: 'white'}}> <FontAwesomeIcon icon={faCirclePlus} /> Create Contest </button>

          <h6>Current or upcoming contests</h6>
          {futureContests.map((arr) => <Contest key={arr['contest_id']} name={arr['contest_name']} start_date={arr['start_date']} end_date={arr['end_date']} participants={arr['participants']} />)}
          <h6>Past contests</h6>
          {pastContests.map((arr) => <Contest key={arr['contest_id']} name={arr['contest_name']} start_date={arr['start_date']} end_date={arr['end_date']} participants={arr['participants']} />)}
      </div>
    </div>
    </div>
    
  
  );
}

export default Contests;
