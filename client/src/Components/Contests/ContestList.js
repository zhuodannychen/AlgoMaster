import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react'
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Contest from './Contest';
import Axios from 'axios'
import Navbar from '../Utilities/Navbar'
import Pagination from "../Utilities/Pagination"
import { Link } from 'react-router-dom'
import "../../App.css"

function Contests() {
  const navigate = useNavigate()
  const [pastContests, setPastContests] = useState([]) // includes past contests
  const [futureContests, setFutureContests] = useState([]) // includes present and future contests
  const [displayContests, setDisplayContests] = useState("current")
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(1);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;

  const slicedFutureContests = futureContests.slice(indexOfFirstRecord, indexOfLastRecord)
  const slicedPastContests = pastContests.slice(indexOfFirstRecord, indexOfLastRecord)
  const nPages = Math.ceil((displayContests == "current" ? futureContests.length : pastContests.length) / recordsPerPage)
  
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
    <React.Fragment>
      <Navbar />
      <div className='container'>
        <div className="contests mt-5">
          {/* Add check whether user is admin */}
          <h2 className='mb-5' style={{ textAlign: 'center'}}> Contests </h2>
          <button className='btn mb-3' type='button' onClick={() => navigate("/create")}> <FontAwesomeIcon icon={faCirclePlus} /> Create Contest </button>
          <select className="form-select mb-3" onChange={(e) => setDisplayContests(e.target.value)}>
            <option selected value="current"> Current / Incoming </option>
            <option value="past"> Past Events </option>
          </select>
          { displayContests == "current" ? slicedFutureContests.map((arr) => <Contest key={arr['contest_id']} name={arr['contest_name']} start_date={arr['start_date']} end_date={arr['end_date']} participants={arr['participants']} />)
          : slicedPastContests.map((arr) => <Contest key={arr['contest_id']} name={arr['contest_name']} start_date={arr['start_date']} end_date={arr['end_date']} participants={arr['participants']} />)}
          <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={ setCurrentPage }/>
      </div>
    </div>
    </React.Fragment>
  );
}

export default Contests;
