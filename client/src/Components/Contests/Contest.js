import React from 'react'
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

  return (
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-sm contest-name mt-"> {props.name} </div>
          <div class="col-sm" style={{textAlign: 'right'}}> 
            <span className='contest_info'>  {parseDate(props.start_date)}, {parseTime(props.start_date)} </span>
            <span id="duration"> {getContestDuration(props.start_date, props.end_date)} hours </span>
            <span id="participants"> {props.participants} participants </span>
            <button className="btn btn-outline-success" style={{textColor: 'green'}} type='button'> Sign Up </button>
          </div>
        </div>
      </div>
  </div>
  )

}

export default Contest;