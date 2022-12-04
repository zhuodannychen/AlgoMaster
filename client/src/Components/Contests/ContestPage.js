import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../../App.css"


function ContestPage(props){
  const [username, setUsername] = useState("");
  const [problems, setProblems] = useState([]);
  const {contestid} = useParams();

  useEffect(() => {
    Axios.get('http://localhost:3001/contestdetails/'+contestid)
    .then(response => {
        setProblems(response.data[1])
    })
  }, []);


  return (
    <div class="container">
        <h1>Contest Page for {contestid}</h1>
        {console.log(problems)}
        {problems.map((problem, idx) => <li key={idx}>{problem['problem_name']} {problem['problem_desc']} {problem['problem_url']}</li>)}
    </div>
  )

}

export default ContestPage;