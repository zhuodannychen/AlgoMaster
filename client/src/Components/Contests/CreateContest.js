import React, { useState } from 'react';
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker';
import "../../App.css";
import image from "../../Assets/images/background.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import "react-datepicker/dist/react-datepicker.css";
import { faPlus , faTrash, faPenToSquare, faEdit } from '@fortawesome/free-solid-svg-icons';
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

export default function CreateContest() {
  const navigate = useNavigate()
  // Contest
  const [contestName, setContestName] = useState()
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState('10:00');
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState('10:00');
  const [questions, setQuestions] = useState([]);
  const [creationStatus, setCreationStatus] = useState('')

  // Modal - questions
  const [problemName, setProblemName] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [problemURL, setProblemURL] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [problemEditing, setProblemEditing] = useState("")


  const zeroPad = (num, places) => String(num).padStart(places, '0')

  function clearProblemForm(){
    setIsEditing(false);
    setProblemName("");
    setProblemDesc("");
    setProblemURL("");
  }

  function addProblemToContest() {
    let newQuestion = {
      id: -1,
      name: problemName, 
      desc: problemDesc, 
      url: problemURL
    }

    setProblemName("");
    setProblemDesc("");
    setProblemURL("");

    const newQuestions = [...questions, newQuestion]
    setQuestions(newQuestions)
    console.log(newQuestions)
  }

  function deleteProblem(idx){
    if (window.confirm("Are you sure?") == true){
      const problems = questions.slice(0, idx).concat(questions.slice(idx+1))
      setQuestions(problems)
    }
  }

  function updateProblem(){
    console.log(problemEditing)
    const updated_questions = [...questions]
    updated_questions.map(q => {
      if (q.name == problemEditing){
        q.name = problemName;
        q.desc = problemDesc;
        q.url = problemURL;
      }
    })

    setQuestions(updated_questions)
  }

  function editProblem(problem){
    setIsEditing(true);
    setProblemEditing(problem.name)

    setProblemName(problem.name);
    setProblemDesc(problem.desc);
    setProblemURL(problem.url);
  }


  const addContest = async () => {
    const startTS = startDate.getFullYear() + '-' + zeroPad((startDate.getMonth()+1), 2) + '-' + zeroPad(startDate.getDate(), 2) + ' ' + startTime + ':00'
    const endTS = endDate.getFullYear() + '-' + zeroPad((endDate.getMonth()+1), 2) + '-' + zeroPad(endDate.getDate(), 2) + ' ' + endTime + ':00'
    const curDate = new Date(Date.now())
    const curTS = curDate.getUTCFullYear() + '-' + zeroPad((curDate.getUTCMonth()+1), 2) + '-' + zeroPad(curDate.getUTCDate(), 2) + ' ' + zeroPad(curDate.getUTCHours(), 2) + ':' + zeroPad(curDate.getMinutes(),2) + ':' + zeroPad(curDate.getSeconds(), 2)

    if (contestName === '') {
        alert('Contest name cannot be empty!')
        return false
    } else if (endTS <= startTS) {
        console.log(endTS, startTS)
        alert('end time before start time!')
        return false
    } else if (startTS < curTS) {
        console.log(startTS, curTS)
        alert('start time is before current time!')
        return false
    }


    console.log(startTS, endTS)
    const response = await Axios.post("http://localhost:3001/contests", {
        contestName: contestName,
        startDate: startTS,
        endDate: endTS,
    })

    if (response.data[0]) {
        const contestID = response.data[1]
        for (let question of questions) {
            Axios.post("http://localhost:3001/problems", {
                contestId: contestID,
                problemName: question.name,
                problemDesc: question.desc,
                problemUrl: question.url 
            }).then((response) => {
                if (response.data[0]) {
                    console.log('problem added!')
                    question.id = response.data[1]
                }
            })
        }
        navigate('/contests')
    }
  }

  return (
    <div>
      <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel"> Coding Problem </h5>
              <button type="button" className="close" data-bs-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label for="exampleInputPassword1"> Problem Name </label>
                <input type="text" className="form-control" id="exampleInputPassword1" placeholder="e.g. Two Sum" onChange={(e) => setProblemName(e.target.value)} value={problemName} />
              </div>
              <div className="form-group mt-4 mb-3">
                <label for="exampleFormControlTextarea1"> Problem Description </label>
                <textarea className="form-control" id="exampleFormControlTextarea1" rows="3" onChange={(e) => setProblemDesc(e.target.value)} value={problemDesc} ></textarea>
              </div>
              <div className="form-group">
                <label for="problemURL"> [Optional] Problem URL </label>
                <input type="text" className="form-control" id="problemURL" onChange={(e) => setProblemURL(e.target.value)} value={problemURL} />
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              { isEditing ? 
              <button type='button' className='btn btn-warning' onClick={updateProblem} data-bs-dismiss="modal"> Finish Edit</button> 
                : 
              <button type="button" className="btn btn-success" onClick={addProblemToContest} data-bs-dismiss="modal"> Add Problem </button>}
            </div>
          </div>
        </div>
      </div>
      <div className="container pt-5">
        <div className='card pt-5 pb-5 createContestContainer'>
        <h2 className='mb-5' style={{textAlign: 'center'}}> Create Contest </h2> 
        <form id="createContest">
          <div className="form-group">
            <label for="contestName"> Contest Name </label>
            <input type="text" className="form-control"  placeholder="e.g. Aggie CCC Competition" onChange={(e) => setContestName(e.target.value)} value={contestName} />
          </div>
          <div className='mt-3'>
            <div className="row">
              <div className="col-sm">
                <div className='mb-1'> Select start date</div>
                <DatePicker id="datePicker" selected={startDate} onChange={(startDate) => setStartDate(startDate)} />
              </div>
              <div className="col-sm">
                <div className="mb-1"> Select start time (UTC)</div>
                <TimePicker onChange={setStartTime} value={startTime} />
              </div>
            </div>

            <div className="row">
              <div className="col-sm">
                <div className='mb-1'> Select end date </div>
                <DatePicker id="datePicker" selected={endDate} onChange={(endDate) => setEndDate(endDate)} />
              </div>
              <div className="col-sm">
                <div className="mb-1"> Select end time (UTC)</div>
                <TimePicker onChange={setEndTime} value={endTime} />
              </div>
            </div>
          </div>
          <div className='mt-3'>
            <div className="form-check form-switch inline mt-4">
              <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
              <label className="form-check-label" for="flexSwitchCheckDefault"> Open to public </label>
            </div>
          </div>
          <div className='contest_questions'>
            <h5 className='mt-5'> Problems </h5>
            <div className='btn btn-success mb-3' onClick={clearProblemForm} data-bs-toggle="modal" data-bs-target="#exampleModal"> <FontAwesomeIcon icon={faPlus} /> Create Problem </div>
              <ul className="list-group">
                { questions.map((question, idx) => 
                <li key={idx} className='list-group-item'> 
                  {question.name} <span className='float-end'> <FontAwesomeIcon className='pointerOnHover' icon={faEdit} onClick={() => editProblem(question)} data-bs-toggle="modal" data-bs-target="#exampleModal" /> <FontAwesomeIcon className='pointerOnHover' icon={faTrash} onClick={() => deleteProblem(idx)} /> </span>
                </li>) 
                }
              </ul>
            </div>
          <button type='button' onClick={addContest} className='btn btn-outline-success w-100 mt-4'> Next Step </button>  
        </form>
        </div>
      </div>
    </div>
  )
}