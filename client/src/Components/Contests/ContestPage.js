import Axios from 'axios'
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "../../App.css"


function ContestPage(props){
  const [username, setUsername] = useState("");
  const [problems, setProblems] = useState([]);
  const [contestName, setContestName] = useState("")
  const {contestid} = useParams();

  useEffect(() => {
    Axios.get('http://localhost:3001/contests/' + contestid)
    .then(response => {
        setContestName(response.data[0]['contest_name'])        
    })

    Axios.get('http://localhost:3001/contestdetails/'+contestid)
    .then(response => {
        setProblems(response.data[1])
    })
  }, []);


  return (
    <div class="container">
        <h1>Contest Page for {contestName}</h1>
        {console.log(problems)}
        {problems.map((problem, idx) => <li key={idx}><a href={problem['problem_url']}>{problem['problem_name']}</a> {problem['problem_desc']}</li>)}
    </div>
  )

}

export default ContestPage;