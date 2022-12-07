import Axios from 'axios'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import "../../App.css"


const monthText = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}

function Contest(props){
  const [username, setUsername] = useState("");
  const [userContests, setUserContests] = useState([]);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("authenticated")) || false;
    const username = JSON.parse(localStorage.getItem("username"))
    if (loggedInUser) {
        setUsername(username)
    }

    Axios.get("http://localhost:3001/user_contests", {
        params: {
            username: username
        }
    }).then((response) => {
        setUserContests(response.data)
    })
  }, []);

  const zeroPad = (num, places) => String(num).padStart(places, '0')
  const dateOrdinal = (day) => {
    if (day > 3 && day < 21) return 'th'
    switch (day % 10) {
      case 1:  return "st"
      case 2:  return "nd"
      case 3:  return "rd"
      default: return "th"
    }
  }

  const parseDate = (timestamp) => {
    const date = new Date(timestamp)

    const month = zeroPad(date.getMonth(), 2)
    const day = zeroPad(date.getDate(), 2)
    const year = zeroPad(date.getFullYear(), 2)

    const startTime = monthText[month] + " " + day + dateOrdinal(day) + ", " + year
    return startTime
  }

  const parseTime = (timestamp) => {
    const date = new Date(timestamp)

    const hours = date.getUTCHours()
    const minutes = zeroPad(date.getMinutes(), 2)
    return hours + ":" + minutes + " UTC"
  }

  const getContestDuration = (startTime, endTime) => {
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)
    const elapsedHours = (endDate - startDate) / 3600000
    // console.log(startDate, endDate, hours)
    const hours = Math.round(elapsedHours * 100) / 100 // rounding to 2 dec places
    return hours
  }

  const addUserToContest = (username, contest_id) => {
    Axios.post("http://localhost:3001/add_user_contest", {username, contest_id})
    .then((response) => {
        if (response.data[0]){
          alert('Signed up for contest!')
        //   navigate("/");
        } else {
          alert('Already signed up for contest!')
        }
    })
  }

  const checkContestStarted = (start_date) => {
    const startTS = start_date 
    const date = new Date()

    const year = zeroPad(date.getUTCFullYear(), 2)
    const month = zeroPad(date.getUTCMonth()+1, 2)
    const day = zeroPad(date.getUTCDate(), 2)
    const hours = zeroPad(date.getUTCHours(), 2)
    const minutes = zeroPad(date.getMinutes(), 2)
    const seconds = zeroPad(date.getSeconds(), 2)
    const curTS = year + "-" + month + "-" + day + "T" + hours + ":" + minutes + ":" + seconds

    return startTS <= curTS
  }

  const checkUserSignedUp = (contest_id) => {
    // console.log(userContests)
    // console.log(contest_id)
    // console.log(userContests.includes(contest_id))
    let low = 0
    let high = userContests.length - 1
    while (low <= high) {
        let mid = low + Math.floor((high - low) / 2)
        if (userContests[mid]['contest_id'] < contest_id) {
            low = mid + 1
        } else if (userContests[mid]['contest_id'] > contest_id) {
            high = mid - 1
        } else {
            return true
        }
    }
    return false
  }

  return (
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-sm contest-name mt-"> {props.name} </div>
          <div class="col-sm" style={{textAlign: 'right'}}> 
            <span className='contest_info'>  {parseDate(props.start_date)}, {parseTime(props.start_date)} </span>
            <span id="duration"> {getContestDuration(props.start_date, props.end_date)} hours </span>
            {/* {console.log(userContests)} */}
            {!props.is_past && checkContestStarted(props.start_date) && checkUserSignedUp(props.contest_id) ? 
            <Link to={`/contests/${props.contest_id}`} className="btn btn-outline-success" style={{textColor: 'green'}} type='button'> Enter </Link>
            : !props.is_past && checkContestStarted(props.start_date) ? <h1></h1>
            : !props.is_past ? <button className="btn btn-outline-success" onClick={() => addUserToContest(username, props.contest_id)} style={{textColor: 'green'}} type='button'> Sign Up </button>
            : <Link to={`/contests/${props.contest_id}`} className="btn btn-outline-success" style={{textColor: 'green'}} type='button'> Enter </Link>
            }
          </div>
        </div>
      </div>
  </div>
  )

}

export default Contest;