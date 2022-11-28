import React, { useState }from 'react';
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker';
import "../App.css"
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export default function CreateContest() {
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [questions, setQuestions] = useState([]);

  return (
    <div>
      <div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel"> Coding Problem </h5>
              <button type="button" class="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="exampleInputPassword1"> Problem Name </label>
                <input type="password" class="form-control" id="exampleInputPassword1" placeholder="e.g. Two Sum" />
              </div>
              <div class="form-group mt-4">
                <label for="exampleFormControlTextarea1"> Problem Description </label>
                <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-success"> Add Problem </button>
            </div>
          </div>
        </div>
      </div>
      <div className="container mt-5">
        <div className='card pt-5 pb-5'>
        <h2 className='mb-5' style={{textAlign: 'center'}}> Create Contest </h2> 
        <form id="createContest">
          <div class="form-group">
            <label for="contestName"> Contest Name </label>
            <input type="email" class="form-control" id="contestName" />
          </div>
          <div className='mt-3'>
            <div className='mb-1'> Select date </div>
            <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className='mt-3'>
            <div class="row">
              <div class="col-sm">
                <div className="mb-1"> Select time </div>
                <TimePicker onChange={setTime} value={time} />
              </div>
              <div class="col-sm">      
                <div class="form-check form-switch inline mt-4">
                  <input class="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <label class="form-check-label" for="flexSwitchCheckDefault"> Open to public </label>
                </div>
              </div>
            </div>
          </div>
          <div className='contest_questions'>
            <h5 className='mt-5'> Problems </h5>
            <div className='btn btn-success' data-bs-toggle="modal" data-bs-target="#exampleModal"> <FontAwesomeIcon icon={faPlus} /> Create Problem </div>
            <ul class="list-group">
              {}
            </ul>
          </div>
          <button type='button' className='btn btn-outline-success w-100 mt-4'> Next Step </button>  
        </form>
        </div>
      </div>
    </div>
  )
}