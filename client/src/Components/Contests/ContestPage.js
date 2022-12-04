import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../../App.css"


function ContestPage(props){
  const [username, setUsername] = useState("");
  const [problems, setProblems] = useState([]);
  const [comments, setComments] = useState([]);
  const {contestid} = useParams();

  useEffect(() => {
    Axios.get('http://localhost:3001/contestdetails/'+contestid)
    .then(response => {
        setProblems(response.data[1])
    })
  }, []);

  useEffect(() => {
    Axios.get('http://localhost:3001/comments/'+contestid)
    .then(response => {
        console.log("Comments: ", response.data)
        setComments(response.data)
    })
  }, []);


  return (
    <div class="container">
        <h1>Contest Page for {contestid}</h1>
        {problems.map((problem, idx) => <li key={idx}>{problem['problem_name']} {problem['problem_desc']} {problem['problem_url']}</li>)}
        <p>Comments</p>
        <div class="mb-3">
          <label for="Comment" class="form-label">Comment</label>
          <textarea class="form-control" id="Comment" rows="3"></textarea>
        </div>
    </div>
  )

}

export default ContestPage;