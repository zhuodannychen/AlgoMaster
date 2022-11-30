import React, { useState }from 'react';
import DatePicker from "react-datepicker"
import TimePicker from 'react-time-picker';
import "../App.css"
import "../Assets/images/background.jpg"
import image from "../Assets/images/background.jpg"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus , faTrash, faPenToSquare, faEdit } from '@fortawesome/free-solid-svg-icons';

export default function CreateContest() {
  // Contest
  const [startDate, setStartDate] = useState(new Date());
  const [time, setTime] = useState('10:00');
  const [questions, setQuestions] = useState([]);

  // Modal - questions
  const [problemName, setProblemName] = useState("");
  const [problemDesc, setProblemDesc] = useState("");
  const [problemURL, setProblemURL] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [problemEditing, setProblemEditing] = useState("")

  function addProblemToContest() {
    const newQuestions = [...questions, {
      name: problemName, 
      desc: problemDesc, 
      url: problemURL
    }]

    setQuestions(newQuestions)
    setProblemName("");
    setProblemDesc("");
    setProblemURL("");

    console.log(newQuestions)
  }

  function deleteProblem(name){
    if (window.confirm("Are you sure?") == true){
      const problems = questions.filter((q) => q.name !== name)
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

  return (
    <div style={{ backgroundImage: `url(${image})`, height: '100vh'}}>
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
            <input type="email" className="form-control" id="contestName" />
          </div>
          <div className='mt-3'>
            <div className='mb-1'> Select date </div>
            <DatePicker id="datePicker" selected={startDate} onChange={(date) => setStartDate(date)} />
          </div>
          <div className='mt-3'>
            <div className="row">
              <div className="col-sm">
                <div className="mb-1"> Select time </div>
                <TimePicker onChange={setTime} value={time} />
              </div>
              <div className="col-sm">      
                <div className="form-check form-switch inline mt-4">
                  <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
                  <label className="form-check-label" for="flexSwitchCheckDefault"> Open to public </label>
                </div>
              </div>
            </div>
          </div>
          <div className='contest_questions'>
            <h5 className='mt-5'> Problems </h5>
            <div className='btn btn-success mb-3' onClick={() => setIsEditing(false)} data-bs-toggle="modal" data-bs-target="#exampleModal"> <FontAwesomeIcon icon={faPlus} /> Create Problem </div>
              <ul className="list-group">
                { questions.map((question, idx) => 
                <li key={idx} className='list-group-item'> 
                  {question.name} <span className='float-end'> <FontAwesomeIcon className='pointerOnHover' icon={faEdit} onClick={() => editProblem(question)} data-bs-toggle="modal" data-bs-target="#exampleModal" /> <FontAwesomeIcon className='pointerOnHover' icon={faTrash} onClick={() => deleteProblem(question.name)} /> </span>
                </li>) 
                }
              </ul>
            </div>
          <button type='button' className='btn btn-outline-success w-100 mt-4'> Next Step </button>  
        </form>
        </div>
      </div>
    </div>
  )
}