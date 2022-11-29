import React from 'react'
import "../../App.css"

function Contest(props){
  return (
    <div class="card mb-3">
      <div class="card-body">
        <div class="row">
          <div class="col-sm contest-name mt-"> {props.name} </div>
          <div class="col-sm" style={{textAlign: 'right'}}> 
            <span className='contest_info'>  {props.date}, {props.time} </span>
            <span id="participants"> {props.participants} participants </span>
            <button className="btn btn-outline-success" style={{textColor: 'green'}} type='button'> Sign Up </button>
          </div>
        </div>
      </div>
  </div>
  )

}

export default Contest;