import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Utilities/Navbar';
import Contest from './Contest';
import image from "../../Assets/images/background.jpg"
import Axios from 'axios'
import { Link } from 'react-router-dom'
import "../../App.css"

function Contests() {
  const navigate = useNavigate();
  const [contests, setContests] = useState([
    {id: 1, name: "DTCC Code-A-Thon", start_date: "Aug 27th 2021", start_time: "11 am CST", seats_left: 25},
    {id: 2, name: "Celebrate PRIDE 2021 Coding Contest", start_date: "June 25th, 2021", start_time: "11:00 am CST", seats_left: 53},
    {id: 3, name: "COVID-19 Relief for India Coding Challenge", start_date: "June 16th, 2021", start_time: "1:30 am CST", seats_left: 14}
  ]);

  useEffect(() => {
    // Grab contests from database
    Axios.get("http://localhost:3001/contests").then((response) => {
        console.log(response.data)
        setContests(response.data)
    })
  }, [])

  return (
    <div >
      <Navbar />
      <div className='container'>
        <div className="contests mt-5">
          {/* Add check whether user is admin */}
          <h2 className='mb-5' style={{ textAlign: 'center'}}> Contests </h2>
          <button className='btn mb-3' type='button' onClick={() => navigate("/create")}> <FontAwesomeIcon icon={faCirclePlus} /> Create Contest </button>
          {contests.map((contest) => <Contest name={contest.name} date={contest.date} time={contest.start_date} seats={contest.seats_left} />)}
      </div>
    </div>
    </div>
    
  
  );
}

export default Contests;
