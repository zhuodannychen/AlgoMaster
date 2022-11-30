import React from 'react'
import "../../App.css"


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

    const month = date.toLocaleString('default', {
        month: 'long',
    })
    const day = date.getDate()
    const year = date.getFullYear()

    const startTime = month + " " + day + dateOrdinal(day) + ", " + year
    return startTime
  }

  const parseTime = (timestamp) => {
    const date = new Date(timestamp)

    const hours = date.getUTCHours()
    const minutes = zeroPad(date.getUTCMinutes(), 2)
    return hours + ":" + minutes + " UTC"
  }

  const getContestDuration = (startTime, endTime) => {
    const startDate = new Date(startTime)
    const endDate = new Date(endTime)
    const hours = (endDate - startDate) / 3600000
    // console.log(startDate, endDate, hours)
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